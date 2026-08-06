export const internships = [
  {
    slug: 'coriolis-ai-internship',
    title: 'AI Intern',
    company: 'Coriolis Technologies',
    location: 'Pune, India',
    period: 'May 2026 — July 2026',
    tagline: 'Worked on production Speech AI systems: fine-tuning a 3B-parameter LLM for Hindi TTS and building an ML verification layer for reliable document classification.',
    tags: ['PyTorch', 'Hugging Face', 'PEFT/LoRA', 'Whisper', 'Python', 'W&B', 'Speech AI'],
    github: null,
    summary: 'During a 3-month AI internship at Coriolis Technologies (Pune), I worked on two interconnected production projects under the mentorship of Bhushan Deshpande and Sudhir Kumar. Primary: adapting the Orpheus-3B LLM for high-quality Hindi TTS through multi-stage fine-tuning. Secondary: designing an ML verification framework to improve reliability of a document classification system.',

    problem: 'Two separate production challenges at Coriolis: (1) No open-source, expressive Hindi TTS system existed — closed APIs were costly and emotionally flat. (2) A document classification DL model had no concept of "uncertain" predictions — it confidently assigned every input to one of 41 categories, even unrelated documents. Both required practical ML engineering under real production constraints.',

    myRole: 'Worked alongside Radhika Dhama (co-intern), with mentorship from senior engineers. My primary ownership was the Hindi TTS project — dataset engineering, multi-stage LoRA fine-tuning, and the WER/CER evaluation pipeline. My secondary contribution was the LOF-based verification framework for document classification reliability. Also built the Soft Skills Analyzer as a pre-internship assessment.',

    approach: [
      {
        step: 1,
        title: 'Hindi TTS — Dataset Engineering',
        description: 'Built a HindiNormalizer pipeline to handle text preprocessing edge cases: digit-to-word conversion, date/currency expansion, abbreviation handling, URL stripping. Curated 31,394+ samples (~53+ hours) from Hinglish, Rasa, and Kathbath datasets with consistent metadata schema.',
      },
      {
        step: 2,
        title: 'Hindi TTS — Multi-Stage Fine-Tuning',
        description: 'Designed and executed a 3-stage LoRA fine-tuning pipeline: Stage 1 (pronunciation alignment on 53hr dataset), Stage 2 (speaker identity injection with speaker tags), Stage 3 (emotion & style conditioning with dual-tag prompts). Each stage built on the previous checkpoint.',
      },
      {
        step: 3,
        title: 'Hindi TTS — Automated Evaluation',
        description: 'Built an automated pipeline over a fixed 500-sample benchmark: synthesize audio → transcribe with Whisper-large-v3 → normalize text → compute WER/CER with jiwer. Ran at every training checkpoint, giving human-interpretable metrics throughout training rather than relying solely on loss curves.',
      },
      {
        step: 4,
        title: 'Document Classification — LOF Verification',
        description: 'Designed a 3-gate verification layer (Global Outlier Guard → Semantic Agreement → Class-Conditional Density) using Local Outlier Factor with cosine distance. The framework operates on DL model embeddings without modifying the underlying classifier, routing uncertain predictions to "Others".',
      },
    ],

    keyDecisions: [
      {
        title: 'Multi-stage training over joint optimization',
        description: 'Separating pronunciation, speaker identity, and emotion into sequential fine-tuning stages made each problem tractable in isolation. Joint training on all objectives simultaneously created conflicting gradients and unstable convergence. Sequential staging allowed clean validation before proceeding.',
      },
      {
        title: 'Production mindset throughout',
        description: 'Both projects were oriented toward deployment reliability, not just benchmark scores — the verification framework explicitly rejects predictions it\'s uncertain about, the TTS evaluation used interpretable WER rather than opaque loss, and dataset curation prioritized coverage of real-world edge cases (code-switching, numerals, punctuation).',
      },
    ],

    results: [
      { metric: '66.6%', label: 'WER Reduction (Hindi TTS)', highlight: true },
      { metric: '82.4%', label: 'CER Reduction (Hindi TTS)', highlight: true },
      { metric: '3-Stage', label: 'Fine-Tuning Pipeline Built' },
      { metric: '0.70', label: 'Intra-Speaker Similarity Achieved' },
      { metric: '500', label: 'Benchmark Samples Evaluated' },
      { metric: '7', label: 'Emotions in TTS System' },
    ],

    resultsNote: 'Metrics from the Hindi TTS project. WER baseline (zero-shot): 92.4%. Final (Stage 3): 30.9%. CER baseline: 88%. Final: 15.4%.',

    challenges: 'Managing two parallel production projects simultaneously with constrained compute resources. The identity chaos problem in TTS Stage 1 — where the model\'s voice drifted randomly — was a significant unexpected challenge that required redesigning the Stage 2 data strategy entirely. The LOF verification framework\'s precision-recall tradeoff remains a calibration challenge: no single threshold satisfies both high recall of "Others" and preservation of correct predictions.',
  },
]
