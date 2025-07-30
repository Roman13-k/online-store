import LikeButton from "@/components/ui/shared/buttons/LikeButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/LikeButton",
  component: LikeButton,
} satisfies Meta<typeof LikeButton>;

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {
    className: "",
    isNeedText: true,
    initValue: true,
  },
};
