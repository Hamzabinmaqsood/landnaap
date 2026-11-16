export interface FaqItem {
  q: string;
  /** Plain text answer. Rendered on the page AND used verbatim in FAQPage JSON-LD. */
  a: string;
}

/** Core explanation of Marla standards, shown on every tool page. */
export const STANDARD_FAQS: FaqItem[] = [
  {
    q: 'What is the difference between a 225 sq ft Marla and a 272.25 sq ft Marla?',
    a: 'Both are called "Marla", but they measure different areas. The 225 sq ft Marla (25 square yards) is used by housing societies such as DHA, Bahria Town and LDA schemes. The 272.25 sq ft Marla (30.25 square yards) is the traditional revenue or Patwari standard used in land records such as the fard, registry and intiqal, and for agricultural land. Because the revenue Marla is 21% larger, a "5 Marla" plot is 1,125 sq ft in a society but 1,361.25 sq ft in revenue records.',
  },
  {
    q: 'Why is the revenue Marla exactly 272.25 sq ft?',
    a: 'The revenue system is built on the karam, a length of 5.5 feet. One square karam (5.5 ft × 5.5 ft) is 30.25 sq ft and is called a Sarsai. Nine Sarsai make one Marla, so 9 × 30.25 = 272.25 sq ft. Twenty Marla make one Kanal (5,445 sq ft) and eight Kanal make one acre (43,560 sq ft).',
  },
  {
    q: 'Which Marla standard should I use?',
    a: 'Use the standard written on your documents. For plots in DHA, Bahria Town, LDA and most private housing societies, use 225 sq ft. For land measured by the Patwari or shown in revenue records (fard, jamabandi, registry), use 272.25 sq ft. Some private developers define a Marla as 250 sq ft, so check the allotment letter or booking form before you compare prices.',
  },
  {
    q: 'How many Marla are in one Kanal?',
    a: 'One Kanal is always 20 Marla in every standard. What changes is the size of the Marla: 1 Kanal = 4,500 sq ft at 225 sq ft per Marla, 5,000 sq ft at 250 sq ft per Marla, and 5,445 sq ft at 272.25 sq ft per Marla.',
  },
];

export const HOME_EXTRA_FAQS: FaqItem[] = [
  {
    q: 'How do I convert Marla to square feet?',
    a: 'Multiply the number of Marla by the Marla size. Square Feet = Marla × 225 for housing societies, Marla × 250 for custom developer schemes, or Marla × 272.25 for revenue land. For example, 10 Marla is 2,250 sq ft, 2,500 sq ft or 2,722.5 sq ft respectively.',
  },
  {
    q: 'What is a Sarsai?',
    a: 'A Sarsai is one ninth of a Marla. On the revenue standard it is 30.25 sq ft (one square karam). On the 225 sq ft standard it is 25 sq ft, and on the 250 sq ft standard it is about 27.78 sq ft.',
  },
  {
    q: 'Why do Karachi plots use square yards instead of Marla?',
    a: 'In Karachi and much of Sindh, plots are usually sold in square yards (gaz), for example 120, 240 or 500 square yards. One square yard is 9 sq ft, so a 120 sq yd plot is 1,080 sq ft, which is 4.8 Marla on the 225 sq ft standard.',
  },
  {
    q: 'Is my data sent to a server when I use the calculator?',
    a: 'No. All calculations run inside your browser using JavaScript. Nothing you type is uploaded or stored by this website.',
  },
];

export const PLOT_FAQS: FaqItem[] = [
  {
    q: 'How do I calculate Marla from plot dimensions?',
    a: 'Multiply the frontage (width) by the depth (length) in feet to get the area in square feet, then divide by the Marla size. For example, 25 ft × 45 ft = 1,125 sq ft, and 1,125 ÷ 225 = 5 Marla on the housing society standard.',
  },
  {
    q: 'Is a 35 × 65 plot a 10 Marla plot?',
    a: 'Yes, in housing societies a 35 ft × 65 ft plot (2,275 sq ft) is sold as a 10 Marla plot. At 225 sq ft per Marla it is actually 10.11 Marla, slightly more than the 2,250 sq ft standard. On the 272.25 revenue standard the same plot is only 8.36 Marla.',
  },
  {
    q: 'What are the dimensions of a 1 Kanal plot?',
    a: 'In housing societies a 1 Kanal plot is commonly 50 ft × 90 ft, which is 4,500 sq ft or exactly 20 Marla at 225 sq ft per Marla. On the revenue standard a Kanal is 5,445 sq ft, for example 55 ft × 99 ft.',
  },
  {
    q: 'How do I enter inches in the plot calculator?',
    a: 'Enter inches as a decimal fraction of a foot: 3 inches = 0.25 ft, 6 inches = 0.5 ft and 9 inches = 0.75 ft. For example, a frontage of 25 ft 6 in should be entered as 25.5.',
  },
];
