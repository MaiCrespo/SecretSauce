import { Outlet, Link, useLocation } from "react-router";
import { Flame, Plus, BookOpen } from "lucide-react";
import { Button } from "../components/ui/button.js";

export function Root() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Flame className="size-8 text-orange-600" />
              <div>
                <h1 className="font-bold text-2xl text-gray-900">SecretSauce</h1>
                <p className="text-xs text-gray-600">BCIT Interview Intelligence</p>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                asChild
              >
                <Link to="/">
                  <BookOpen className="size-4 mr-2" />
                  Browse
                </Link>
              </Button>
              <Button
                variant={location.pathname === "/add" ? "default" : "ghost"}
                asChild
              >
                <Link to="/add">
                  <Plus className="size-4 mr-2" />
                  Add Question
                </Link>
              </Button>
              <Button
                variant={location.pathname === "/practice" ? "default" : "ghost"}
                asChild
              >
                <Link to="/practice">
                  <Flame className="size-4 mr-2" />
                  Practice
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p className="font-medium text-gray-900">SecretSauce</p>
          <p className="mt-1">Real Interview Intelligence from BCIT Peers</p>
        </div>
      </footer>
    </div>
  );
}
