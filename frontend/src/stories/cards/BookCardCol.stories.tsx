import BookCardCol from "@/components/ui/shared/cards/BookCardCol";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Cards/BookCardCol",
  component: BookCardCol,
} satisfies Meta<typeof BookCardCol>;

type Story = StoryObj<typeof BookCardCol>;

export const Default: Story = {
  args: {
    price: 123,
    title: "",
    comments: 123,
    rating: 123,
    images: undefined,
    id: "",
    category_slug: "",
  },
};
