import React from "react";
import {
    PrismicRichText as BasePrismicRichText,
    type PrismicRichTextProps,
    type JSXMapSerializer,
  } from "@prismicio/react";
  import { PrismicNextLink } from "@prismicio/next";
  
//   import { Heading } from "./Heading";
  
export const defaultComponents: JSXMapSerializer = {
    heading1: ({ children }) => (
      <>{children}</>
    ),
    heading2: ({ children }) => (
      <>{children}</>
    ),
    heading3: ({ children }) => (
      <>{children}</>
    ),
    heading4: ({ children }) => (
      <>{children}</>
    ),
    heading5: ({ children }) => (
      <>{children}</>
    ),
    paragraph: ({ children }) => (
      <span style={{ color: 'inherit' }}>{children}</span>
    ),
    em: ({ children }) => (
      <em style={{ 
        color: '#E81A68',
        fontStyle:'normal',
      }}>{children}</em>
    ),
    oList: ({ children }) => (
      <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
    ),
    oListItem: ({ children }) => (
      <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
    ),
    list: ({ children }) => (
      <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
    ),
    listItem: ({ children }) => (
      <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
    ),
    preformatted: ({ children }) => (
      <pre className="mb-7 rounded-sm bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
        <code>{children}</code>
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    hyperlink: ({ children, node }) => (
      <PrismicNextLink
        field={node.data}
        className="underline decoration-1 underline-offset-2"
      >
        {children}
      </PrismicNextLink>
    ),
  };
  
  export function PrismicRichText({
    components,
    ...props
  }: PrismicRichTextProps) {
    return (
      <BasePrismicRichText
        components={{ ...defaultComponents, ...components }}
        {...props}
      />
    );
  }
  