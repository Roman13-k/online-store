import RangeSlider from "@/components/ui/shared/inputs/RangeSlider";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Inputs/RangeSlider",
  component: RangeSlider,
} satisfies Meta<typeof RangeSlider>;

type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  args: {},
};
