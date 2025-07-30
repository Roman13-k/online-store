import BookOrShopButton from "@/components/ui/shared/buttons/BookOrShopButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/BookOrShopButton",
  component: BookOrShopButton,
} satisfies Meta<typeof BookOrShopButton>;

type Story = StoryObj<typeof BookOrShopButton>;

export const Default: Story = {
  args: {},
};
