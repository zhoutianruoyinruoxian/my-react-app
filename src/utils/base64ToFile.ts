/**
 * @desc   使用方法：
          const src = `data:application/pdf;base64,${messages.substr(11)}`;
          const pdfFile = base64ToFile(src, `${config.fileName}.pdf`);
 */

export function base64ToFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
