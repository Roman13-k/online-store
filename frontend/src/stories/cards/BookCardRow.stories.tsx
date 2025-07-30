import BookCardRow from "@/components/ui/shared/cards/BookCardRow";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Cards/BookCardRow",
  component: BookCardRow,
} satisfies Meta<typeof BookCardRow>;

type Story = StoryObj<typeof BookCardRow>;

export const Default: Story = {
  args: {
    id: "",
    price: 123,
    title: "",
    comments: 123,
    rating: 123,
    images: undefined,
    author: "",
    publishing: "",
    isbn: "",
    series: "",
    year: 123,
    category_slug: "",
  },
};
