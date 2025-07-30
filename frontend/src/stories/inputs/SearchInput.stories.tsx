import SearchInput from "@/components/ui/shared/inputs/SearchInput";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Inputs/SearchInput",
  component: SearchInput,
} satisfies Meta<typeof SearchInput>;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    isOpenUploadModal: true,
  },
};
