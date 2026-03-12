import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Building2, Briefcase } from "lucide-react";
import { storage } from "../utils/storage.js";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.js";
import { Button } from "../components/ui/button.js";
import { Badge } from "../components/ui/badge.js";
import { StarRating } from "../components/star-rating.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.js";

export function Practice() {
  const [questions, setQuestions] = useState([]);
  const [practiceSet, setPracticeSet] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    filterAndShuffleQuestions();
  }, [questions, selectedCompany, selectedRole]);

  const loadQuestions = () => {
    const data = storage.getQuestions();
    setQuestions(data);
  };

  const filterAndShuffleQuestions = () => {
    let filtered = [...questions];

    if (selectedCompany !== "all") {
      filtered = filtered.filter((q) => q.company === selectedCompany);
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter((q) => q.role === selectedRole);
    }

    const shuffled = filtered.sort(() => Math.random() - 0.5);
    setPracticeSet(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const handleNext = () => {
    if (currentIndex < practiceSet.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleShuffle = () => {
    filterAndShuffleQuestions();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const companies = Array.from(new Set(questions.map((q) => q.company).filter(Boolean)));
  const roles = Array.from(new Set(questions.map((q) => q.role)));

  const currentQuestion = practiceSet[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Practice Mode</h2>
        <p className="text-gray-600">
          Master your interview skills with real questions from BCIT students
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Company</label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleShuffle} variant="outline" size="sm">
              <Shuffle className="size-4 mr-2" />
              Shuffle
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm">
              <RotateCcw className="size-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {practiceSet.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-gray-500">
              No questions available for practice. Add some questions first or adjust your filters!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-600">
            Question {currentIndex + 1} of {practiceSet.length}
          </div>

          <Card className="min-h-[400px]">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {currentQuestion.company && (
                  <Badge variant="secondary" className="gap-1">
                    <Building2 className="size-3" />
                    {currentQuestion.company}
                  </Badge>
                )}
                <Badge variant="outline" className="gap-1">
                  <Briefcase className="size-3" />
                  {currentQuestion.role}
                </Badge>
              </div>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">Frequency:</span>
                <StarRating rating={currentQuestion.frequency} readonly />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showAnswer ? (
                <div className="text-center py-8">
                  <Button onClick={() => setShowAnswer(true)} size="lg">
                    Show Answer
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-sm text-blue-900 mb-2">Answer:</h4>
                    <p className="text-sm text-blue-800 whitespace-pre-wrap">{currentQuestion.answer}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-sm text-green-900 mb-2">Tips & Tricks:</h4>
                    <p className="text-sm text-green-800 whitespace-pre-wrap">{currentQuestion.tips}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button onClick={handlePrevious} disabled={currentIndex === 0} variant="outline">
              <ChevronLeft className="size-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {practiceSet.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setShowAnswer(false);
                  }}
                  className={`size-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to question ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentIndex === practiceSet.length - 1}
              variant="outline"
            >
              Next
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
