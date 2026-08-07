export const projects = [
  // ─── 1. SELECTIVE VERIFICATION FRAMEWORK ─────────────────────────────────
  {
    slug: 'selective-verification-framework',
    title: 'Selective Verification Framework',
    subtitle: 'for Reliable Document Classification',
    tagline: 'A 3-stage ML safety layer that filters unreliable DL predictions — routing uncertain documents to "Others" instead of confidently misfiling them.',
    category: 'ML Engineering · Research',
    year: '2026',
    featured: true,
    accentClass: 'border-accent-violet',
    accentColor: '#8b5cf6',
    team: 'Team of 4 — Aman Ray, Radhika Dhama, Sania Rawat, Aarushi Kumar',
    tags: ['Python', 'Scikit-learn', 'LOF', 'Embeddings', 'Anomaly Detection', 'ML Engineering'],
    github: null,
    summary: 'A production-grade verification layer built on top of a 41-class document classifier. Instead of blindly trusting every DL prediction, the framework runs each output through three sequential checks — routing uncertain or out-of-distribution inputs to a safe "Others" bucket rather than producing a confident wrong answer.',

    problem: 'A deep learning classifier correctly categorizes PDFs into 41 document types, but has a critical design flaw: it has no concept of "unknown." Feed it a completely unrelated document and it confidently misfiles it into one of the 41 categories. Additionally, some in-distribution documents were being misclassified. Two failure modes required solving simultaneously, without modifying the DL model itself: (1) out-of-distribution inputs receiving confident wrong labels, and (2) in-distribution inputs being misfiled.',

    myRole: 'As one of four team members who each independently developed a different approach, I designed and implemented the LOF-based (Local Outlier Factor) verification pipeline. My framework operates entirely on the DL model\'s output embeddings and predicted label — never modifying the underlying model. The system evaluates each prediction through three sequential density checks before deciding to accept or reroute it.',

    approach: [
      {
        step: 1,
        title: 'Global Outlier Guard',
        description: 'A LOF model trained on the full set of training embeddings across all 41 classes. When a new document arrives, its embedding is checked against this global density model. If the LOF score exceeds a threshold — the point is isolated relative to all known training data — it\'s immediately routed to "Others". It doesn\'t resemble any known category.',
      },
      {
        step: 2,
        title: 'Semantic Agreement Validation',
        description: 'For documents that pass Stage 1, the system checks if the k-nearest neighbors (cosine distance) of the new embedding predominantly belong to the DL\'s predicted class. If the neighborhood disagrees with the predicted label, the prediction lacks semantic support — the embedding is geographically inconsistent with the predicted category — and the document is rejected.',
      },
      {
        step: 3,
        title: 'Class-Conditional Density Check',
        description: 'A specialized LOF model is fitted on only the training embeddings of the predicted class. The new document is checked against this class-specific density model. A high LOF score here means the document sits in a sparse or boundary region of the predicted class — not a core member — and is conservatively routed to "Others".',
      },
      {
        step: 4,
        title: 'Accept or Reroute',
        description: 'A prediction must clear all three checks to be accepted. Failing any single gate routes the document to "Others". This conservative philosophy prioritizes reliability over throughput: the system would rather admit uncertainty than produce a confident wrong answer in a production environment.',
      },
    ],

    keyDecisions: [
      {
        title: 'Why LOF over a fixed distance threshold?',
        description: 'Document categories have inherently different densities in embedding space — legal contracts cluster tightly, general correspondence is diffuse. A single global distance threshold would either over-reject from dense classes or under-reject from sparse ones. LOF adapts to local density, measuring isolation relative to each point\'s neighborhood — making it robust across heterogeneous document distributions.',
      },
      {
        title: 'Why class-conditional density at Stage 3?',
        description: 'A document can pass the global check (it\'s a legitimate document type) and semantic agreement (neighbors agree on class), yet still sit at the periphery of that class — near a decision boundary. Stage 3 catches these boundary-dwellers before they produce overconfident wrong predictions. The cost of a borderline "Others" label is far lower than a confident wrong category in production.',
      },
      {
        title: 'Cosine distance over Euclidean',
        description: 'Document embeddings live in high-dimensional space where Euclidean distance suffers from the curse of dimensionality. Cosine distance captures angular similarity — measuring directional alignment between embedding vectors, which is more semantically meaningful for text representations where direction encodes conceptual content.',
      },
    ],

    results: [
      { metric: '3-Stage', label: 'Sequential Verification Pipeline' },
      { metric: '41 → 42', label: 'Classes (added "Others")' },
      { metric: 'LOF', label: 'Core Algorithm (Cosine Distance)' },
      { metric: '0%', label: 'DL Model Code Modified' },
    ],

    resultsNote: 'The framework successfully reroutes uncertain predictions to "Others", improving deployment reliability. Exact recall/precision metrics depend on threshold calibration and are tunable based on acceptable risk tolerance.',

    challenges: 'The core tension is the precision-recall tradeoff of "Others". Increasing recall of "Others" (catching more uncertain/wrong predictions) inevitably pushes some correct predictions into "Others" — the verification layer sometimes flags legitimate predictions as uncertain. Three LOF thresholds need simultaneous tuning, and grid search over threshold combinations reveals no single configuration that perfectly satisfies both goals. The final approach treats this as a risk management decision: thresholds are set conservatively for deployment contexts where a wrong label is more costly than an "Others" label.',
  },

  // ─── 2. HINDI TTS (ORPHEUS) ───────────────────────────────────────────────
  {
    slug: 'hindi-tts-orpheus',
    title: 'Fine-tuning Orpheus-3B',
    subtitle: 'for Hindi Speech Synthesis',
    tagline: 'Adapted a 3-billion parameter English LLM for expressive, emotion-controlled Hindi TTS — achieving a 66.6% Word Error Rate reduction across three fine-tuning stages.',
    category: 'Speech AI · Deep Learning',
    year: '2026',
    featured: true,
    accentClass: 'border-accent-blue',
    accentColor: '#3b82f6',
    team: 'Aman Ray & Radhika Dhama · Mentored by Bhushan Deshpande & Sudhir Kumar · Coriolis Technologies',
    tags: ['PyTorch', 'Hugging Face', 'PEFT/LoRA', 'Whisper', 'SNAC Codec', 'Transformers', 'W&B'],
    github: null,
    summary: 'Built an end-to-end Hindi speech synthesis system by fine-tuning the Orpheus-3B LLM — framing speech generation as causal next-token prediction over SNAC audio codecs. Three progressive training stages tackled pronunciation alignment, speaker identity stability, and emotional expressiveness, reducing WER from 92.4% to 30.9%.',

    problem: 'Hindi (600M+ speakers) has a critical gap in open-source, expressive TTS. Closed APIs (Google, Azure) produce flat, robotic speech at high cost. Open-source alternatives (VITS, Coqui) lack emotional control and require full retraining for new languages. The challenge: adapt an English-centric 3B-parameter LLM for high-quality Hindi synthesis with speaker identity and emotion control — without training from scratch.',

    myRole: 'Co-led the full project at Coriolis Technologies. My responsibilities included: building the HindiNormalizer text preprocessing pipeline, designing the multi-stage fine-tuning strategy, implementing the LoRA training configuration (rank selection, alpha tuning), building the 500-sample automated WER/CER evaluation pipeline using Whisper-large-v3, and analyzing results across all training checkpoints.',

    approach: [
      {
        step: 1,
        title: 'Architecture — LLM as TTS Engine via SNAC Codec',
        description: 'Rather than acoustic model → vocoder pipelines, Orpheus-3B frames speech as causal next-token prediction. The LLM vocabulary was extended with 28,682 custom audio tokens from the SNAC neural codec — which encodes audio hierarchically: Level 1 (prosody, 12Hz), Level 2 (formants/vowels, 24Hz), Level 3 (consonants, 48Hz). 7 interleaved tokens per 83ms audio chunk = 84 audio tokens/second.',
      },
      {
        step: 2,
        title: 'Stage 1 — Pronunciation Alignment (Zero-shot → Intelligible)',
        description: 'Baseline zero-shot evaluation: WER 92.4%, CER 88% — completely unusable. Stage 1 trained on 31,394 samples (~53 hours) using LoRA (Rank=64, Alpha=64) with gradient clipping. Result: WER dropped to 35.1% — a 62% improvement. Remaining problem: identity chaos — voice drifted randomly across genders within the same sentence due to multi-speaker training data.',
      },
      {
        step: 3,
        title: 'Stage 2 — Speaker Identity Control (Stable Voices)',
        description: 'Introduced explicit speaker metadata tags ([Speaker=prakhar]) into text prompts, forcing the LLM to associate tags with acoustic traits. Fine-tuned on ~22k samples targeting two consistent voices (Prakhar: male, Prerna: female). Result: intra-speaker similarity 0.70, inter-speaker separation 0.31, WER 33%. Problem: monotone "news anchor" delivery — no natural cadence or emotional variance.',
      },
      {
        step: 4,
        title: 'Stage 3 — Emotion & Style Injection (Expressive Speech)',
        description: 'Added dual-tag conditioning: [speaker=prerna] [tone=joy]. Fine-tuned on 5,000 samples across 7 emotions (anger, surprise, sad, happy, neutral, fear, disgust). Key insight: emotion tags act as regularizers — forcing the model to associate specific phonetic patterns with emotional categories improved overall token prediction accuracy beyond just style. Final WER: 30.9%, CER: 15.4%.',
      },
    ],

    keyDecisions: [
      {
        title: 'Multi-stage over one-shot training',
        description: 'Each stage addressed exactly one problem: pronunciation alignment → speaker stability → emotional expressiveness. One-shot training on a combined dataset would create a conflicted optimization target — simultaneously learning Hindi phonetics, speaker separation, and emotional prosody, making convergence unreliable. Sequential stages allowed clean validation of each capability before moving to the next.',
      },
      {
        title: 'LoRA over full fine-tuning',
        description: 'Full fine-tuning of a 3B-parameter model on limited data risks catastrophic forgetting of the LLM\'s linguistic knowledge. LoRA freezes base weights and learns small residual matrices (Rank=64) — preserving pre-trained language understanding while adapting audio generation. This made multi-stage training feasible on available GPU hardware without model collapse.',
      },
      {
        title: 'ASR-based evaluation over loss curves alone',
        description: 'Loss curves don\'t tell you if speech is intelligible to a human. The automated evaluation pipeline synthesized 500 benchmark samples, transcribed with Whisper-large-v3, and computed WER/CER — giving human-interpretable metrics at every checkpoint. This revealed regressions that loss curves alone would have hidden.',
      },
    ],

    results: [
      { metric: '66.6%', label: 'WER Reduction (92.4% → 30.9%)', highlight: true },
      { metric: '82.4%', label: 'CER Reduction (88% → 15.4%)', highlight: true },
      { metric: '75+ hrs', label: 'Hindi Training Data' },
      { metric: '500', label: 'Benchmark Samples (Fixed Set)' },
      { metric: '0.70', label: 'Intra-Speaker Similarity' },
      { metric: '7', label: 'Emotions Supported' },
    ],

    resultsNote: 'Measured on a fixed 500-sample benchmark dataset across 3 phases (basic phonology, conversational, real-world). Baseline (zero-shot English model): WER 92.4%, CER 88%.',

    challenges: 'The "identity chaos" discovered in Stage 1 — random gender/pitch drift mid-sentence — was unexpected and required completely redesigning the data strategy for Stage 2. The discovery that emotion tags act as accuracy regularizers (not just style injectors) emerged from careful analysis of why Stage 3 improved WER beyond what emotional expressiveness alone would explain. Future work: RLHF/GRPO reward optimization and model migration to Gemma-3-270M for edge deployment (target: sub-1GB VRAM).',
  },

  // ─── 3. SOFT SKILL ANALYZER ───────────────────────────────────────────────
  {
    slug: 'soft-skill-analyzer',
    title: 'AI-Based Speech',
    subtitle: 'Soft Skills Analyzer',
    tagline: 'An AI-powered speech assessment platform that evaluates communication quality — clarity, pacing, engagement, and confidence — with LLM-driven semantic feedback. Deployed live.',
    category: 'NLP · Speech AI · Full-Stack',
    year: '2026',
    featured: false,
    accentClass: 'border-accent-cyan',
    accentColor: '#06b6d4',
    team: 'Solo project',
    tags: ['Python', 'Whisper', 'Librosa', 'Llama 3.1', 'Streamlit', 'Cerebras API'],
    github: 'https://github.com/amanray8900-ux/Soft_Skill_Analyser',
    liveDemo: 'https://softskillanalyser-kqmauq2z6csnfu3hesqprr.streamlit.app/',
    summary: 'A deployed Streamlit application that accepts a speech audio recording and outputs quantitative scores (pacing, clarity, engagement, confidence) plus LLM-generated semantic feedback. Processes audio through two parallel pipelines — acoustic feature extraction via Librosa and speech transcription via Whisper — before combining them in a mathematical scoring engine.',

    problem: 'Assessing communication soft skills is subjective and inconsistent across evaluators. The goal was to build an objective, reproducible system that scores a speech recording identically regardless of who runs it — using acoustic features and transcript analysis, supplemented by LLM semantic insight where subjective language understanding is needed.',

    myRole: 'Designed and built the complete system solo: dual audio processing pipelines, the mathematical scoring engine with calibrated formulas, LLM API integration for semantic feedback, and the Streamlit dashboard with interactive visualizations. Built as an internship assessment project for Coriolis Technologies, later deployed publicly.',

    approach: [
      {
        step: 1,
        title: 'Dual Parallel Audio Processing',
        description: 'Audio input is simultaneously processed by: (1) Librosa — extracting acoustic features: pitch standard deviation, pause counts, active speech duration, speaking rate. (2) OpenAI Whisper — transcribing audio to text for vocabulary and fluency analysis.',
      },
      {
        step: 2,
        title: 'Text Feature Extraction',
        description: 'The Whisper transcript is analyzed for: total word count, filler word count (um, uh, like, you know, etc.), and unique word count — vocabulary richness = unique words / total words. These feed directly into the scoring formulas.',
      },
      {
        step: 3,
        title: 'Mathematical Scoring Engine',
        description: 'Four scores by formula: (1) Pacing Score: WPM 130–170 → 100 pts; penalty outside range. (2) Clarity Score: 100 minus penalty proportional to filler ratio. (3) Engagement Score: raw score from pitch variation + vocab richness, minus pause penalty if pauses ≥ 5. (4) Confidence Score: 0.6 × Clarity + 0.4 × Pacing.',
      },
      {
        step: 4,
        title: 'LLM Semantic Analysis',
        description: 'The full transcript is sent to Llama 3.1 (8B or 70B) via Cerebras API. The LLM performs deep semantic analysis — identifying communication patterns, specific weaknesses (e.g., passive voice overuse, lack of concrete examples), and generating actionable improvement guidance beyond what numeric metrics can capture.',
      },
      {
        step: 5,
        title: 'Interactive Streamlit Dashboard',
        description: 'Results display as score gauges, metric breakdowns by dimension, and the LLM feedback report — all in a deployed public Streamlit app. Users can upload recordings and immediately receive structured assessment.',
      },
    ],

    keyDecisions: [
      {
        title: 'Rule-based scoring, not LLM scoring',
        description: 'An obvious approach would be sending all audio features directly to the LLM and asking it to score. This was deliberately rejected: LLM scores are inconsistent — the same audio receives different scores across runs. Mathematical formulas guarantee identical outputs for identical inputs. Reliability is a prerequisite for any evaluation tool that will be used for actual hiring/assessment decisions.',
      },
      {
        title: 'LLM for qualitative feedback only',
        description: 'The LLM is used where it excels — semantic understanding, communication pattern recognition, generating human-readable advice — not for quantitative scoring. This hybrid architecture combines the consistency of rule-based scoring with the language understanding of LLMs.',
      },
    ],

    results: [
      { metric: 'Live', label: 'Deployed on Streamlit Cloud', highlight: true },
      { metric: '4', label: 'Communication Dimensions Scored' },
      { metric: 'Llama 3.1', label: 'Semantic Analysis (Cerebras)' },
      { metric: '2×', label: 'Parallel Audio Pipelines' },
    ],

    resultsNote: 'Publicly accessible live demo. Evaluates clarity, pacing, engagement, and confidence with consistent mathematical scoring.',

    challenges: 'The hardest design decision was calibrating the scoring rubric — what penalty to apply for what severity of filler words, what WPM range is "good" pacing. Too strict and every speaker fails; too lenient and the scores lose discriminative power. The calibration process required comparing against reference recordings of good and poor communication samples. The deeper insight: designing evaluation criteria for a scoring system is as intellectually demanding as building the model itself.',
  },

  // ─── 4. BANK TELEMARKETING ────────────────────────────────────────────────
  {
    slug: 'bank-telemarketing-optimization',
    title: 'Bank Direct Marketing',
    subtitle: 'Campaign Optimization',
    tagline: 'End-to-end ML pipeline predicting term deposit subscriptions — 73% subscriber recall and 95% non-subscriber precision, framed as a business optimization problem.',
    category: 'Machine Learning · Business Analytics',
    year: '2025',
    featured: false,
    accentClass: 'border-accent-emerald',
    accentColor: '#10b981',
    team: 'Solo project',
    tags: ['Python', 'Scikit-learn', 'SMOTE', 'Decision Tree', 'ColumnTransformer', 'Naive Bayes'],
    github: 'https://github.com/amanray8900-ux/Predictive-Modeling-for-Bank-Direct-Marketing-Campaigns',
    summary: 'ML pipeline for a Portuguese bank to predict which customers will subscribe to term deposits from telemarketing campaigns. Optimized not for raw accuracy but for two business-critical metrics: subscriber recall (don\'t miss willing customers) and non-subscriber precision (safe to skip calling these people). Decision Tree outperformed Gaussian Naive Bayes on both business metrics.',

    problem: 'A Portuguese bank runs telemarketing campaigns to sell term deposits. Most called customers decline. The business need: identify likely subscribers (call them) vs. unlikely subscribers (skip and save agent time). This requires business-metric-driven model selection — not just raw accuracy — plus careful prevention of data leakage from variables only available after calls end.',

    myRole: 'End-to-end: problem framing, EDA, multicollinearity analysis, preprocessing pipeline design, model selection, hyperparameter tuning, and business-metric evaluation. Key contribution: framing evaluation around subscriber recall and non-subscriber precision rather than standard accuracy/F1.',

    approach: [
      {
        step: 1,
        title: 'Business-First Problem Framing',
        description: 'Defined two target metrics: (1) Recall of y=1 (subscribers) — missing a willing subscriber = lost revenue. (2) Precision of y=0 (non-subscribers) — when model says "don\'t call," how reliable is that? High precision = safe cost savings. This framing rejected "duration" (call length) as a feature — it\'s a post-hoc correlate unavailable before a call, causing data leakage.',
      },
      {
        step: 2,
        title: 'Multicollinearity Handling',
        description: 'Three economic indicators (nr.employed, euribor3m, emp.var.rate) showed >90% pairwise correlation. Selected nr.employed as the representative: most stable macroeconomic indicator, directly interpretable for business stakeholders as overall employment level, captures the financial environment without redundancy. Removed the other two without material accuracy loss.',
      },
      {
        step: 3,
        title: 'Scikit-learn Pipeline with ColumnTransformer',
        description: 'Built a clean ML pipeline: OneHotEncoder for 10 categorical columns, StandardScaler for 6 continuous columns, remainder="passthrough" to preserve other features. Pipeline encapsulates all transformations — test data is always scaled/encoded with training-fit transformers only, preventing data leakage. SMOTE applied for class imbalance. stratify=Y in split maintains class ratios.',
      },
      {
        step: 4,
        title: 'Model Comparison & Business Recommendation',
        description: 'Gaussian Naive Bayes: F1=0.66, zero overfitting, but only 49% subscriber recall — misses half of potential conversions. Decision Tree: F1=0.60, zero overfitting, 73% subscriber recall, 95% non-subscriber precision. Decision Tree recommended: superior on both business metrics despite lower raw F1.',
      },
    ],

    keyDecisions: [
      {
        title: 'Removing "duration" — data leakage prevention',
        description: '"Duration" (call length in seconds) strongly predicts subscription but is only available after a call ends — impossible to use for pre-call targeting. Including it would produce misleadingly high validation scores on historical data while being completely unavailable in production. Removing it forces the model to learn genuine pre-call predictors.',
      },
      {
        title: 'Business metrics over raw accuracy',
        description: 'In class-imbalanced datasets (far more non-subscribers than subscribers), a model can achieve high accuracy by predicting "no" for nearly everyone. Framing evaluation around subscriber recall and non-subscriber precision aligns the ML objective directly with business cost: missed conversions and wasted call center hours.',
      },
    ],

    results: [
      { metric: '73%', label: 'Subscriber Recall (Decision Tree)', highlight: true },
      { metric: '95%', label: 'Non-Subscriber Precision', highlight: true },
      { metric: '0.60', label: 'Macro F1 (Zero Overfitting)' },
      { metric: '20', label: 'Features (Client + Campaign + Economic)' },
    ],

    resultsNote: 'Decision Tree selected over Naive Bayes despite lower raw F1 — superior on both business metrics. Zero overfitting: identical train and test F1.',

    challenges: 'The fundamental tension: the "better" model by raw F1 (Naive Bayes, 0.66) is actually inferior for the business goal — it misses 51% of willing subscribers. This illustrates a core ML lesson: model selection must be driven by the cost structure of the problem, not a single aggregate metric. The right evaluation metric depends entirely on what failures are more costly.',
  },

  // ─── 5. MOVIE BOX OFFICE ─────────────────────────────────────────────────
  {
    slug: 'movie-box-office-prediction',
    title: 'Pre-Release Bollywood',
    subtitle: 'Box Office Risk Predictor',
    tagline: 'A risk-averse ML classifier that identifies 88% of potential box office flops from pre-release features — protecting investors from financial disasters.',
    category: 'Machine Learning · Risk Analysis',
    year: '2025',
    featured: false,
    accentClass: 'border-accent-amber',
    accentColor: '#f59e0b',
    team: 'Solo project',
    tags: ['Python', 'Scikit-learn', 'Decision Tree', 'Naive Bayes', 'Feature Engineering', 'SMOTE'],
    github: 'https://github.com/amanray8900-ux/Pre-Release-Box-Office-Prediction-and-Risk-Analysis',
    summary: 'Binary classification (Hit/Flop) for Bollywood movies using only pre-release features — genre, director, cast, franchise status, remake status, budget. Optimized for flop recall (risk mitigation) over accuracy. A tuned Decision Tree transformed from severely overfit (42% flop recall) to highly generalized (88% flop recall) through hyperparameter tuning.',

    problem: 'Film investors face asymmetric risk: the financial loss from a flop vastly exceeds the opportunity cost of missing a hit. A useful prediction system must use only genuinely pre-release information — "Number of Screens" and "Revenue" both cause data leakage, despite being in the dataset. The model must learn from director track records, cast experience, and creative attributes alone.',

    myRole: 'End-to-end: identifying data leakage, designing pre-release feature set, building the preprocessing pipeline, model selection and tuning, and formulating the risk-averse evaluation framework.',

    approach: [
      {
        step: 1,
        title: 'Data Leakage Elimination',
        description: '"Number of Screens" (finalized after distribution deals) and "Revenue" (post-release) both cause data leakage — they\'re correlated with hit/flop but unavailable before release. Removing both forced the model to learn genuine pre-release signals: genre, director newness, lead star popularity, franchise status, remake status, budget.',
      },
      {
        step: 2,
        title: 'High-Cardinality Encoding Strategy',
        description: 'Lead Actor, Director, and Music Director each had hundreds of unique values. Full one-hot encoding would create thousands of columns — curse of dimensionality. Used max_categories=15: keep top 14 most frequent (established names), bin rest as "Infrequent". Preserved high-signal names while keeping the feature space manageable.',
      },
      {
        step: 3,
        title: 'Risk-Averse Model Training',
        description: 'Primary metric: Recall of Flops (Class 1). Used class_weight="balanced" in Decision Tree (forces extra attention to the minority class) and fit_prior=False in BernoulliNB (prevents majority-class bias). BernoulliNB chosen over GaussianNB: the one-hot encoded dataset produces binary features, which BernoulliNB is specifically designed for.',
      },
      {
        step: 4,
        title: 'Hyperparameter Tuning — Transforming the Decision Tree',
        description: 'Pre-tuning: severe overfitting, only 42% flop recall. The unrestricted tree memorized training noise. Post-tuning (restricted max_depth, adjusted min_samples_split, balanced class weights): eliminated overfitting entirely (Train F1=0.77, Test F1=0.75), flop recall jumped to 88% — more than doubling its risk-mitigation capability.',
      },
    ],

    keyDecisions: [
      {
        title: 'Optimizing for flop recall, not accuracy',
        description: 'Standard ML maximizes accuracy or F1. Here, missing a flop (investing in a disaster) >> missing a hit (opportunity cost). The final model catches 88% of flops at 66% hit precision — a deliberate asymmetric optimization driven by real-world investment risk structure, not algorithmic convenience.',
      },
      {
        title: 'BernoulliNB over GaussianNB',
        description: 'GaussianNB assumes continuous features follow a Gaussian distribution. After extensive one-hot encoding, the dataset is dominated by binary (0/1) features. BernoulliNB is specifically designed for binary feature distributions — selecting the right Naive Bayes variant is a meaningful model choice, not an interchangeable detail.',
      },
    ],

    results: [
      { metric: '88%', label: 'Flop Recall (Risk Mitigation)', highlight: true },
      { metric: '66%', label: 'Hit Precision (Investment Confidence)' },
      { metric: '0.75', label: 'Test F1 (No Overfitting)' },
      { metric: '1,698', label: 'Bollywood Films (2005–2017)' },
    ],

    resultsNote: 'Post hyperparameter tuning. Pre-tuning flop recall was only 42% — tuning more than doubled it while completely eliminating overfitting.',

    challenges: 'The dramatic transformation of the Decision Tree — from severely overfit (42% recall) to well-generalized (88% recall) — required understanding exactly why unrestricted trees overfit: they create splits on noise in the training data. Constraining max_depth and min_samples_split forces the tree to find patterns that generalize. This is a textbook bias-variance tradeoff, but experiencing it experimentally across multiple tuning iterations is what makes it concrete.',
  },

  // ─── 6. GEORGIAN CAR PRICE ────────────────────────────────────────────────
  {
    slug: 'georgian-car-price',
    title: 'Georgian Used Car',
    subtitle: 'Price Prediction',
    tagline: 'Regression ML pipeline on a messy Kaggle dataset — heavy data cleaning, systematic outlier experimentation, and model comparison to achieve R² 0.755 and MAE under 4,100.',
    category: 'Machine Learning · Regression',
    year: '2025',
    featured: false,
    accentClass: 'border-accent-rose',
    accentColor: '#f43f5e',
    team: 'Solo project',
    tags: ['Python', 'Scikit-learn', 'XGBoost', 'Random Forest', 'EDA', 'KNN Imputer'],
    github: 'https://github.com/amanray8900-ux/Georgian_used_car_price_prediction',
    summary: 'End-to-end regression pipeline on a Kaggle dataset of Georgian used cars. Involved heavy data cleaning (string-encoded numerics, massive outliers, 313 duplicates), systematic outlier removal experimentation across three strategies, comprehensive EDA, KNN imputation for missing values, and comparison of 5 ML models — achieving the target of R² > 0.75 and MAE < 5,000.',

    problem: 'The dataset contained significant data quality issues: price outliers spanning orders of magnitude, string-encoded numeric fields ("3.5 Turbo" in engine volume, "24000 KM" in mileage), high-cardinality columns with rare categories, 313 duplicate rows, and substantial missing values in the Levy column. The prediction target (price in GEL) itself had extreme outliers requiring deliberate treatment strategy.',

    myRole: 'End-to-end project: data cleaning strategy, outlier handling experimentation, EDA, feature engineering decisions, KNN imputation design, model selection, and hyperparameter tuning.',

    approach: [
      {
        step: 1,
        title: 'Data Cleaning & String Impurity Treatment',
        description: 'Multiple impurity types required custom cleaning: (1) Levy column: dashes (null markers) → extract nulls, remove dashes. (2) Engine volume: "3.5 Turbo" → strip " Turbo", cast to float. (3) Mileage: "24000 KM" → strip " km", cast to float. (4) Doors: inconsistent encoding. Removed 313 duplicates, fixed extreme price outliers in initial pass.',
      },
      {
        step: 2,
        title: 'Systematic Outlier Removal Experiment',
        description: 'Compared three strategies: (1) IQR ±1.5 removal — deleted 23% of data (4,500 rows), R²=0.76 but unacceptable data loss. (2) IQR ±1.5 capping — preserved data but R² dropped to 0.60 (capping distorts the price distribution). (3) IQR ±3 removal — deleted only ~5% (1,000 rows), R²=0.755. Selected Option 3 as the best data-preservation/quality tradeoff.',
      },
      {
        step: 3,
        title: 'EDA & Feature Decisions',
        description: 'Comprehensive EDA: univariate distributions, correlation analysis, bivariate scatter/bar plots vs. price. Key decisions: production year bounded to 1980–2000 (pre/post extremes removed), engine volume capped at 7.5 (value of 20.0 clearly erroneous), ID dropped (no predictive value). High-cardinality categoricals encoded via OHE with infrequent_if_exist (threshold: mean frequency < 0.0025 → "Others").',
      },
      {
        step: 4,
        title: 'KNN Imputation for Levy Column',
        description: 'Levy had significant nulls after dash removal. Used KNN Imputer (k=5) with neighbor features: production year, engine volume, cylinders, mileage. KNN imputation preserves local data structure — a high-mileage old car gets a levy imputed from similar cars, not pulled toward the global mean which would distort the relationship between features and price.',
      },
      {
        step: 5,
        title: 'Model Selection & Tuning',
        description: 'Compared: Linear Regression, SVR, Decision Tree, Random Forest, XGBoost. Best pre-tuning: Random Forest (R²=0.76, MAE=3,941) and XGBoost (R²=0.72, MAE=4,598). After GridSearchCV tuning: Random Forest (R²=0.755, MAE=4,037) and XGBoost (R²=0.744, MAE=4,349). Both targets achieved: R² > 0.75, MAE < 5,000 GEL.',
      },
    ],

    keyDecisions: [
      {
        title: 'IQR ±3 over ±1.5 for outlier removal',
        description: 'Standard ±1.5 IQR removes 23% of rows — too aggressive. High-priced used cars are legitimate observations, not errors; they carry real information about the upper end of the market. Expanding to ±3 IQR removes only genuinely extreme outliers (likely data entry errors) while preserving informative premium-price cars.',
      },
      {
        title: 'Random Forest outperforming XGBoost — an open question',
        description: 'Random Forest outperformed XGBoost pre-tuning but converged to similar performance post-tuning. Hypothesis: XGBoost\'s regularization hyperparameter space (learning_rate, reg_alpha, reg_lambda) requires finer GridSearchCV coverage than what was used, while Random Forest is more robust to hyperparameter choice in this dataset size regime. This remains an open area for further investigation.',
      },
    ],

    results: [
      { metric: '0.755', label: 'R² Score (Random Forest)', highlight: true },
      { metric: '< 4,100', label: 'Mean Absolute Error (GEL)', highlight: true },
      { metric: '5', label: 'ML Models Compared' },
      { metric: '~19k', label: 'Dataset Rows (Initial)' },
    ],

    resultsNote: 'After GridSearchCV tuning. Both target metrics achieved: R² > 0.75, MAE < 5,000 GEL. Project goal: predict price within ±5,000 GEL of actual.',

    challenges: 'The most interesting finding was the unexpected behavior of Random Forest after hyperparameter tuning — it slightly degraded from its pre-tuning performance (0.76 → 0.755) while XGBoost improved. This paradox highlights that GridSearchCV finds the best configuration in the searched space, not the global optimum — and that the search grid itself is a hyperparameter that can leave the true optimum unexplored.',
  },
]
