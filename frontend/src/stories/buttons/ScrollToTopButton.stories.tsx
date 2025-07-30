import ScrollToTopButton from "@/components/ui/shared/buttons/ScrollToTopButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/ScrollToTopButton",
  component: ScrollToTopButton,
} satisfies Meta<typeof ScrollToTopButton>;

type Story = StoryObj<typeof ScrollToTopButton>;

export const Default: Story = {
  args: {},
};
