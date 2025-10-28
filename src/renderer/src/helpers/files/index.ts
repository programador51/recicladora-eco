export async function savePDF():Promise<void>    {
  try {
    const path = await window.api.getReportPdf()
    alert(`PDF guardado en: ${path}`);
  } catch (error) {
    console.error("Error guardando PDF:", error);
  }
}