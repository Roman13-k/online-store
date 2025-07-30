import "../src/app/globals.css";
import type { Preview } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import ru from "../messages/ru.json";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => {
      return (
        <NextIntlClientProvider locale='ru' messages={ru}>
          <Story />
        </NextIntlClientProvider>
      );
    },
  ],
};

export default preview;
