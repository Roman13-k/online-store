import MainButton from "@/components/ui/shared/buttons/MainButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/MainButton",
  component: MainButton,
} satisfies Meta<typeof MainButton>;

type Story = StoryObj<typeof MainButton>;

export const Default: Story = {
  args: {
    className: "",
    btnColor: "orange",
    children: "Default Button",
  },
};
