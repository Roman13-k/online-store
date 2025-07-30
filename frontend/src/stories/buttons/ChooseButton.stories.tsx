import ChooseButton from "@/components/ui/shared/buttons/ChooseButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/ChooseButton",
  component: ChooseButton,
} satisfies Meta<typeof ChooseButton>;

type Story = StoryObj<typeof ChooseButton>;

export const Default: Story = {
  args: {
    className: "",
  },
};
