import ArrowButton from "@/components/ui/shared/buttons/ArrowButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/ArrowButton",
  component: ArrowButton,
} satisfies Meta<typeof ArrowButton>;

type Story = StoryObj<typeof ArrowButton>;

export const Default: Story = {
  args: {
    className: "",
    imgSrc: "",
  },
};
