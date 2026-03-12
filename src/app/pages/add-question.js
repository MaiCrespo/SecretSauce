import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { storage } from "../utils/storage.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.js";
import { Input } from "../components/ui/input.js";
import { Textarea } from "../components/ui/textarea.js";
import { Button } from "../components/ui/button.js";
import { Label } from "../components/ui/label.js";
import { StarRating } from "../components/star-rating.js";
import { toast } from "sonner";

export function AddQuestion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    question: "",
    answer: "",
    tips: "",
    frequency: 3,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.role || !formData.question || !formData.answer || !formData.tips) {
      toast.error("Please fill in all required fields");
      return;
    }

    storage.addQuestion({
      company: formData.company || undefined,
      role: formData.role,
      question: formData.question,
      answer: formData.answer,
      tips: formData.tips,
      frequency: formData.frequency,
    });

    toast.success("Question added successfully!", {
      icon: <CheckCircle2 className="size-4" />,
    });

    setFormData({
      company: "",
      role: "",
      question: "",
      answer: "",
      tips: "",
      frequency: 3,
    });

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Share an Interview</h2>
        <p className="text-gray-600">Help your BCIT peers by sharing your interview experience</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
          <CardDescription>
            Fill in the details about the interview question you encountered
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company">
                Company Name <span className="text-gray-400">(Optional)</span>
              </Label>
              <Input
                id="company"
                placeholder="e.g., Google, Microsoft, Amazon..."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                Role <span className="text-red-500">*</span>
              </Label>
              <Input
                id="role"
                placeholder="e.g., Software Engineer, Product Manager..."
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="question">
                Interview Question <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="question"
                placeholder="Enter the interview question you were asked..."
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>
                Question Frequency <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-3">
                <StarRating
                  rating={formData.frequency}
                  onRatingChange={(rating) => setFormData({ ...formData, frequency: rating })}
                />
                <span className="text-sm text-gray-600">How common is this question?</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">
                Your Answer <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="answer"
                placeholder="Share your answer or a sample answer to this question..."
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tips">
                Tips & Tricks <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="tips"
                placeholder="Share any tips, tricks, or advice for answering this question..."
                value={formData.tips}
                onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Add Question
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
