import InfoButton from "@/components/ui/shared/buttons/InfoButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/InfoButton",
  component: InfoButton,
} satisfies Meta<typeof InfoButton>;

type Story = StoryObj<typeof InfoButton>;

export const Default: Story = {
  args: {
    text: "",
  },
};
