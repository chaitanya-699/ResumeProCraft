import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { type ResumeData } from '@shared/schema';

// Function to generate and download a PDF from an HTML element
export const generatePdf = async (resumeElement: HTMLElement, resumeData: ResumeData): Promise<void> => {
  if (!resumeElement) {
    throw new Error('Resume element not found');
  }
  
  try {
    // Create canvas from the resume element
    const canvas = await html2canvas(resumeElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });
    
    // A4 dimensions in mm: 210 x 297
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate the ratio to fit the image to the PDF
    const widthRatio = pdfWidth / canvas.width;
    const heightRatio = pdfHeight / canvas.height;
    const ratio = Math.min(widthRatio, heightRatio);
    
    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;
    
    // Center the image on the page
    const xPosition = (pdfWidth - canvasWidth) / 2;
    const yPosition = 0;
    
    pdf.addImage(imgData, 'PNG', xPosition, yPosition, canvasWidth, canvasHeight);
    
    // Generate a filename based on the person's name
    const fileName = resumeData.personalInfo.fullName
      ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';
    
    // Download the PDF
    pdf.save(fileName);
    
    return;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};
