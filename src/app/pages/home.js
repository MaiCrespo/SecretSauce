import { useState, useEffect } from "react";
import { Search, Trash2, Building2, Briefcase } from "lucide-react";
import { storage } from "../utils/storage.js";
import { Input } from "../components/ui/input.js";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.js";
import { Badge } from "../components/ui/badge.js";
import { Button } from "../components/ui/button.js";
import { StarRating } from "../components/star-rating.js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.js";

export function Home() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const data = storage.getQuestions();
    setQuestions(data);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this question?")) {
      storage.deleteQuestion(id);
      loadQuestions();
    }
  };

  const companies = Array.from(new Set(questions.map((q) => q.company).filter(Boolean)));
  const roles = Array.from(new Set(questions.map((q) => q.role)));

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tips.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCompany =
      selectedCompany === "all" || q.company === selectedCompany;

    const matchesRole = selectedRole === "all" || q.role === selectedRole;

    return matchesSearch && matchesCompany && matchesRole;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Stop Guessing. Start Knowing.
        </h2>
        <p className="text-xl text-gray-700 mb-2">
          Real Interview Intelligence from BCIT Peers.
        </p>
        <p className="text-gray-600">
          Join 400+ BCIT students sharing the 'Secret Sauce' to 2026 hiring.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Company</label>
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
              <label className="text-sm font-medium mb-2 block">Role</label>
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
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{filteredQuestions.length}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{companies.length}</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{roles.length}</div>
              <div className="text-sm text-gray-600">Roles</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500">
                No questions found. Try adjusting your filters or add a new question!
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredQuestions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {question.company && (
                        <Badge variant="secondary" className="gap-1">
                          <Building2 className="size-3" />
                          {question.company}
                        </Badge>
                      )}
                      <Badge variant="outline" className="gap-1">
                        <Briefcase className="size-3" />
                        {question.role}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{question.question}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-600">Frequency:</span>
                      <StarRating rating={question.frequency} readonly />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(question.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="answer" className="border-none">
                    <AccordionTrigger className="text-sm font-medium">
                      View Answer & Tips
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Answer:</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">{question.answer}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Tips & Tricks:</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">{question.tips}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
