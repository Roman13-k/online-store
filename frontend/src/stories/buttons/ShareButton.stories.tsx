import ShareButton from "@/components/ui/shared/buttons/ShareButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/ShareButton",
  component: ShareButton,
} satisfies Meta<typeof ShareButton>;

type Story = StoryObj<typeof ShareButton>;

export const Default: Story = {
  args: {
    isNeedText: true,
  },
};
