import Foundation
import Vision
import ImageIO
let base=CommandLine.arguments[1]
let manifestURL=URL(fileURLWithPath:base+"/tmp/notes-image-manifest.json")
let entries=try JSONSerialization.jsonObject(with:Data(contentsOf:manifestURL)) as! [[String:Any]]
var results:[[String:Any]]=[]
for (idx,entry) in entries.enumerated(){
  let url=URL(fileURLWithPath:entry["path"] as! String)
  var item:[String:Any]=["id":entry["id"]!,"tab":entry["tab"]!]
  autoreleasepool {
    let request=VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = false
    do {
      try VNImageRequestHandler(url:url).perform([request])
      let observations=request.results ?? []
      item["text"]=observations.compactMap{$0.topCandidates(1).first?.string}.joined(separator:"\n")
      item["confidence"]=observations.compactMap{$0.topCandidates(1).first?.confidence}.min() ?? 0
    } catch { item["error"]=String(describing:error); item["text"]="" }
  }
  results.append(item)
  if (idx+1)%200==0 {print("OCR \(idx+1)/\(entries.count)");fflush(stdout)}
}
let data=try JSONSerialization.data(withJSONObject:results,options:[.prettyPrinted,.sortedKeys])
try data.write(to:URL(fileURLWithPath:base+"/tmp/notes-ocr.json"))
print("Completed OCR of \(results.count) embedded images")
