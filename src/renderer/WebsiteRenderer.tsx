import React, { Suspense } from "react";
import ComponentRegistry from "./ComponentRegistry";

interface Section {
  id: string;
  component: string;
  props: Record<string, any>;
  order: number;
}

interface Page {
  slug: string;
  title: string;
  sections: Section[];
}

interface WebsiteData {
  pages: Page[];
}

interface SectionRendererProps {
  component: string;
  props: Record<string, any>;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  component,
  props,
}) => {
  const Component = ComponentRegistry[component];

  if (!Component) {
    return (
      <div className="p-4 bg-muted text-muted-foreground text-sm text-center">
        Component "{component}" not found
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="p-8 flex justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

interface PageRendererProps {
  page: Page;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ page }) => {
  const sorted = [...page.sections].sort((a, b) => a.order - b.order);

  return (
    <div>
      {sorted.map((section) => (
        <SectionRenderer
          key={section.id}
          component={section.component}
          props={section.props}
        />
      ))}
    </div>
  );
};

interface WebsiteRendererProps {
  data: WebsiteData;
  currentPage?: string;
}

const WebsiteRenderer: React.FC<WebsiteRendererProps> = ({
  data,
  currentPage = "home",
}) => {
  const page = data.pages.find((p) => p.slug === currentPage) || data.pages[0];

  if (!page) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No pages found in website spec
      </div>
    );
  }

  return <PageRenderer page={page} />;
};

export default WebsiteRenderer;
