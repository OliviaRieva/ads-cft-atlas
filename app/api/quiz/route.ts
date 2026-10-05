import { getQuizDb } from "../../../db";
import { abandonTest, answerQuestion, authenticate, createLearner, createRecovery, getDashboard, getPublicTest, QuizError, restoreLearner, startTest } from "../../../lib/quiz-store";

export const dynamic = "force-dynamic";
const COOKIE = "atlas_learner";
const headers = { "Cache-Control": "private, no-store, max-age=0", "Vary": "Cookie", "X-Content-Type-Options": "nosniff" };
function cookie(request: Request) { return request.headers.get("cookie")?.split(";").map(v => v.trim()).find(v => v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1); }
function response(request: Request, data: unknown, token?: string) {
  const result = Response.json(data, { headers });
  if (token) result.headers.set("Set-Cookie", `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`);
  return result;
}
function failure(error: unknown) {
  if (error instanceof QuizError) return Response.json({ error: error.message }, { status: error.status, headers });
  console.error("Quiz persistence error", error);
  return Response.json({ error: "Saved progress is temporarily unavailable. Your previous results are safe; please try again shortly." }, { status: 503, headers });
}
export async function GET(request: Request) {
  try {
    const db = getQuizDb();
    let id = await authenticate(db, cookie(request));
    let token: string | undefined;
    if (!id) { const created = await createLearner(db); id = created.id; token = created.token; }
    const test = new URL(request.url).searchParams.get("test");
    return response(request, test ? { test: await getPublicTest(db, id, test) } : { dashboard: await getDashboard(db, id) }, token);
  } catch (error) { return failure(error); }
}
export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) throw new QuizError("Open the quiz on this website to save your progress.", 403);
    if (!request.headers.get("content-type")?.startsWith("application/json")) throw new QuizError("Send a JSON quiz request.", 415);
    if (Number(request.headers.get("content-length") ?? 0) > 8192) throw new QuizError("This request is too large.", 413);
    const text = await request.text();
    if (text.length > 8192) throw new QuizError("This request is too large.", 413);
    let body: Record<string, unknown>;
    try { body = JSON.parse(text); } catch { throw new QuizError("The quiz request could not be read."); }
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new QuizError("The quiz request could not be read.");
    const db = getQuizDb();
    if (body.action === "restore") {
      const restored = await restoreLearner(db, body.code);
      return response(request, { dashboard: await getDashboard(db, restored.id) }, restored.token);
    }
    const id = await authenticate(db, cookie(request));
    if (!id) throw new QuizError("Reload the page to connect to your saved progress.", 401);
    if (body.action === "start") return response(request, { test: await startTest(db, id, body.settings) });
    if (body.action === "answer") return response(request, { test: await answerQuestion(db, id, body) });
    if (body.action === "recovery") return response(request, { code: await createRecovery(db, id) });
    if (body.action === "abandon") { await abandonTest(db, id, body.testId); return response(request, { dashboard: await getDashboard(db, id) }); }
    throw new QuizError("Unknown quiz action.");
  } catch (error) { return failure(error); }
}
