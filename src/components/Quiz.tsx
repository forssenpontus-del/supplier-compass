import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { quizQuestions, type Answers } from "@/data/quiz";
import { cn } from "@/lib/utils";

interface QuizProps {
  onComplete: (answers: Answers) => void;
  onBack: () => void;
}

export const Quiz = ({ onComplete, onBack }: QuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const q = quizQuestions[step];
  const current = answers[q.id];
  const progress = ((step + (current !== undefined ? 1 : 0)) / quizQuestions.length) * 100;

  const select = (idx: number) => {
    setAnswers((a) => ({ ...a, [q.id]: idx }));
  };

  const next = () => {
    if (step < quizQuestions.length - 1) setStep((s) => s + 1);
    else onComplete(answers);
  };

  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
    else onBack();
  };

  return (
    <section className="container mx-auto max-w-3xl px-6 py-20">
      {/* Progress */}
      <div className="mb-12">
        <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          <span>Fråga {step + 1} av {quizQuestions.length}</span>
          <span className="font-mono-num text-accent">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
            {q.question}
          </h2>
          <p className="mt-3 text-muted-foreground">{q.description}</p>

          <div className="mt-10 space-y-3">
            {q.options.map((opt, idx) => {
              const selected = current === idx;
              return (
                <motion.button
                  key={opt.label}
                  whileHover={{ x: 4 }}
                  onClick={() => select(idx)}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-xl border bg-card p-5 text-left transition-all",
                    selected
                      ? "border-primary bg-primary/10 shadow-[0_0_30px_hsl(var(--primary)/0.25)]"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <span className={cn("font-medium", selected && "text-foreground")}>{opt.label}</span>
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border transition",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-transparent group-hover:border-primary/50"
                    )}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between">
        <Button variant="ghost" onClick={prev} className="gap-2 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          {step === 0 ? "Tillbaka" : "Föregående"}
        </Button>
        <Button
          onClick={next}
          disabled={current === undefined}
          className="h-12 gap-2 bg-primary px-6 font-semibold text-primary-foreground disabled:opacity-40"
        >
          {step === quizQuestions.length - 1 ? "Visa resultat" : "Nästa"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
