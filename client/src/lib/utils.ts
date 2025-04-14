import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats date range for display in resume templates
 */
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
