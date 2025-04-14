import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats date range for display in resume templates
 */
/**
 * Formats description text to include bullet points if they don't already exist
 * This makes it easier for users to create properly formatted bullet lists
 */
export function formatDescription(text: string): string {
  if (!text) return '';
  
  // If the text already has bullets, return as is
  if (text.includes('•')) return text;
  
  // Split into lines, trim each line, filter out empty lines
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  // If only one line, return as is
  if (lines.length <= 1) return text;
  
  // Add bullet points to beginning of each line if they don't have one already
  return lines
    .map(line => line.startsWith('•') || line.startsWith('-') || line.startsWith('*') 
      ? line 
      : `• ${line}`)
    .join('\n');
}

export function formatDateRange(startDate: string, endDate: string, current: boolean = false): string {
  // Parse and format start date (if available)
  let formattedStartDate = '';
  if (startDate) {
    try {
      const date = new Date(startDate);
      formattedStartDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (error) {
      formattedStartDate = startDate; // Fallback to original string if parsing fails
    }
  }

  // Format end date or show "Present" if current
  let formattedEndDate = '';
  if (current) {
    formattedEndDate = 'Present';
  } else if (endDate) {
    try {
      const date = new Date(endDate);
      formattedEndDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (error) {
      formattedEndDate = endDate; // Fallback to original string if parsing fails
    }
  }

  // Construct date range string
  if (formattedStartDate && formattedEndDate) {
    return `${formattedStartDate} - ${formattedEndDate}`;
  } else if (formattedStartDate) {
    return formattedStartDate;
  } else if (formattedEndDate) {
    return formattedEndDate;
  }
  
  return '';
}
