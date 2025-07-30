import ShopCard from "@/components/ui/shared/cards/ShopCard";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Cards/ShopCard",
  component: ShopCard,
} satisfies Meta<typeof ShopCard>;

type Story = StoryObj<typeof ShopCard>;

export const Default: Story = {
  args: {
    shop: { id: "", cover: "", title: "title", description: "description", rate: 5 },
  },
};
