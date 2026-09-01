const fs = require('fs');

let content = fs.readFileSync('app/components/AcxCheckerArticle.tsx', 'utf8');

const oldContent = `      <p>
        As a principal audio mastering engineer and voiceover coach, I have pre-mastered hundreds of audiobooks 
        destined for ACX, Audible, and Findaway Voices. The frustrating reality for many indie authors and narrators 
        is that up to 30% of self-narrated audiobooks are rejected during the automated ACX QA (Quality Assurance) checks.
      </p>
      <p>
        These rejections rarely happen because of a bad performance. They occur due to rigid technical requirements 
        around acoustic power measurement. Sudden plosive peaks, aggressive noise gates that produce unnatural dead-silence gaps, 
        erratic mic positioning affecting RMS, and improper head/tail room tone trimming are the primary culprits. 
      </p>
      <p>
        Traditionally, narrators relied on desktop installations or complex Audacity Nyquist plugin configurations to 
        run an ACX check. This online ACX compliance analyzer in browser solves that problem. It serves as an instant, 
        zero-upload solution to test audiobook chapters against official Audible ACX requirements for free—saving hours of frustration.
      </p>`;

const newContent = `      <p>
        As a principal audio mastering engineer and voiceover coach, I have pre-mastered hundreds of audiobooks 
        destined for ACX, Audible, and Findaway Voices.
      </p>
      <p>
        The frustrating reality for many indie authors and narrators 
        is that up to 30% of self-narrated audiobooks are rejected during the automated ACX QA (Quality Assurance) checks.
      </p>
      <p>
        These rejections rarely happen because of a bad performance. They occur due to rigid technical requirements 
        around acoustic power measurement.
      </p>
      <p>
        Sudden plosive peaks, aggressive noise gates that produce unnatural dead-silence gaps, 
        erratic mic positioning affecting RMS, and improper head/tail room tone trimming are the primary culprits. 
      </p>
      <p>
        Traditionally, narrators relied on desktop installations or complex Audacity Nyquist plugin configurations to 
        run an ACX check. 
      </p>
      <p>
        This online ACX compliance analyzer in browser solves that problem. It serves as an instant, 
        zero-upload solution to test audiobook chapters against official Audible ACX requirements for free—saving hours of frustration.
      </p>`;

if (content.includes('As a principal audio mastering engineer')) {
    // Because spacing might be slightly off in the literal string, we'll use regex for each paragraph block
    content = content.replace(
        /<p>\s*As a principal audio mastering engineer[\s\S]*?\(Quality Assurance\) checks\.\s*<\/p>/,
        `<p>
        As a principal audio mastering engineer and voiceover coach, I have pre-mastered hundreds of audiobooks 
        destined for ACX, Audible, and Findaway Voices.
      </p>
      <p>
        The frustrating reality for many indie authors and narrators 
        is that up to 30% of self-narrated audiobooks are rejected during the automated ACX QA (Quality Assurance) checks.
      </p>`
    );
    
    content = content.replace(
        /<p>\s*These rejections rarely happen[\s\S]*?primary culprits\.\s*<\/p>/,
        `<p>
        These rejections rarely happen because of a bad performance. They occur due to rigid technical requirements 
        around acoustic power measurement.
      </p>
      <p>
        Sudden plosive peaks, aggressive noise gates that produce unnatural dead-silence gaps, 
        erratic mic positioning affecting RMS, and improper head/tail room tone trimming are the primary culprits. 
      </p>`
    );
    
    content = content.replace(
        /<p>\s*Traditionally, narrators relied[\s\S]*?hours of frustration\.\s*<\/p>/,
        `<p>
        Traditionally, narrators relied on desktop installations or complex Audacity Nyquist plugin configurations to 
        run an ACX check. 
      </p>
      <p>
        This online ACX compliance analyzer in browser solves that problem. It serves as an instant, 
        zero-upload solution to test audiobook chapters against official Audible ACX requirements for free—saving hours of frustration.
      </p>`
    );
    
    fs.writeFileSync('app/components/AcxCheckerArticle.tsx', content);
    console.log('patched paragraphs');
} else {
    console.log('not found');
}
