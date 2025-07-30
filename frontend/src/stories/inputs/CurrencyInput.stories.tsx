import CurrencyInput from "@/components/ui/shared/inputs/CurrencyInput";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Inputs/CurrencyInput",
  component: CurrencyInput,
} satisfies Meta<typeof CurrencyInput>;

type Story = StoryObj<typeof CurrencyInput>;

export const Default: Story = {
  args: {
    isMax: 0,
  },
};
