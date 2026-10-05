import Foundation
import PDFKit
import ImageIO

guard CommandLine.arguments.count >= 3 else {
  fputs("usage: extract_pdf.swift input.pdf output.txt [render-dir]\n", stderr)
  exit(2)
}

let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
guard let document = PDFDocument(url: input) else {
  fputs("could not open PDF\n", stderr)
  exit(1)
}

var text = "# PDF pages: \(document.pageCount)\n\n"
for index in 0..<document.pageCount {
  let pageText = document.page(at: index)?.string ?? ""
  text += "\n\n===== PAGE \(index + 1) =====\n\n\(pageText)"
}
try text.write(to: output, atomically: true, encoding: .utf8)

if CommandLine.arguments.count >= 4 {
  let renderDirectory = URL(fileURLWithPath: CommandLine.arguments[3], isDirectory: true)
  try FileManager.default.createDirectory(at: renderDirectory, withIntermediateDirectories: true)
  for index in 0..<document.pageCount {
    guard let page = document.page(at: index) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let scale: CGFloat = 1.6
    let width = Int(bounds.width * scale)
    let height = Int(bounds.height * scale)
    guard let context = CGContext(
      data: nil, width: width, height: height, bitsPerComponent: 8,
      bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(),
      bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else { continue }
    context.setFillColor(CGColor(gray: 1, alpha: 1))
    context.fill(CGRect(x: 0, y: 0, width: width, height: height))
    context.saveGState()
    context.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: context)
    context.restoreGState()
    guard let image = context.makeImage(),
          let destination = CGImageDestinationCreateWithURL(
            renderDirectory.appendingPathComponent(String(format: "page-%03d.png", index + 1)) as CFURL,
            "public.png" as CFString, 1, nil
          ) else { continue }
    CGImageDestinationAddImage(destination, image, nil)
    CGImageDestinationFinalize(destination)
  }
}

print("pages=\(document.pageCount)")
