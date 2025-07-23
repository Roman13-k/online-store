import NotFoundScreen from "@/components/screens/NotFoundScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена | ПРОКниги",
  description: "Похоже, такой страницы не существует. Вернитесь на главную.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundScreen />;
}
