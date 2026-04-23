import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Quiz } from "@/components/Quiz";
import { Scanning } from "@/components/Scanning";
import { Results } from "@/components/Results";
import { HowItWorks } from "@/components/HowItWorks";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import type { Answers } from "@/data/quiz";

type Stage = "intro" | "quiz" | "scanning" | "results";

const Index = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    if (stage !== "intro") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [stage]);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {stage === "intro" && (
          <>
            <Hero onStart={() => setStage("quiz")} />
            <HowItWorks />
          </>
        )}

        {stage === "quiz" && (
          <Quiz
            onComplete={(a) => {
              setAnswers(a);
              setStage("scanning");
            }}
            onBack={() => setStage("intro")}
          />
        )}

        {stage === "scanning" && <Scanning onDone={() => setStage("results")} />}

        {stage === "results" && (
          <Results answers={answers} onRestart={() => setStage("quiz")} />
        )}
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
