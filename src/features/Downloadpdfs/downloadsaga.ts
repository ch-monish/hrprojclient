import { call, takeEvery } from "redux-saga/effects"
import { downloadpdf, generatepdf } from "../../api/agent"

function* genpdfsagaworker(payload) {
  console.log(payload)
  // console.log("pdf downloading")
  var res = yield call(generatepdf.downloadpdf, payload.payload)

  const byteCharacters = atob(res.toString('base64'));
  // const byteCharacters = Buffer.from(res, 'base64');
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray]);

  //   console.log(blob);
  let a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = payload.payload.filename+"_JD.pdf";
  // a.href=window.URL.createObjectURL(res1)
  a.click();


  console.log(res)
}
function* downloadpdfsagaworker(payload) {
  console.log(payload)
  var filename = payload.payload.Resume
  console.log(filename)
  var res = yield call(downloadpdf.downloadpdf, payload.payload)

  const byteCharacters = atob(res.toString('base64'));
  // const byteCharacters = Buffer.from(res, 'base64');
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  //for download
  const blob = new Blob([byteArray]);
  //for opening in new tab
  // const blob = new Blob([byteArray], { type: "application/pdf" });

  //   console.log(blob);
  let a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  //for download
  a.download = "pdffile.pdf";
  a.download = filename.substring(filename.lastIndexOf("/") + 1, filename.toString().length)
  a.click();

  //for opening in new tab
  // const pdfWindow = window.open();
  // pdfWindow.location.href = a.href;    


  console.log(res)
}
export function* watcherpdfdownload() {
  yield takeEvery("pdfdownload/genpdf", genpdfsagaworker)
  yield takeEvery("pdfdownload/downloadresume", downloadpdfsagaworker)

  // yield takeEvery("Industry/createIndustryaction",createIndustrysagaworker)
  // yield takeEvery("Industry/updateIndustryaction",updateIndustrysagaworker)
}