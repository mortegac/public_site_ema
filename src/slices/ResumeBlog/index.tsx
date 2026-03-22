import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/app/components/PrismicRichText";

import {
  Box,
  Container,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

/**
 * Props for `ResumeBlog`.
 */
export type ResumeBlogProps = SliceComponentProps<Content.ResumeBlogSlice>;

/**
 * Component for "ResumeBlog" Slices.
 * Renders a blog summary section with a header and a grid of blog post cards.
 * Content is driven by slice.primary.title, slice.primary.description,
 * and slice.primary.options (repeatable group of blog cards).
 */
const ResumeBlog: FC<ResumeBlogProps> = ({ slice }) => {
  const primary = slice.primary as any;
  const options: any[] = primary?.options ?? [];

  return (
    <Box
      component="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      bgcolor="#f9f9f9"
      pt={6}
      pb={8}
    >
      <Container sx={{ maxWidth: "1200px !important" }}>
        {/* Section header */}
        {primary?.title && (
          <Box textAlign="center" mb={1}>
            <PrismicRichText field={primary.title} />
          </Box>
        )}
        {primary?.description && (
          <Box textAlign="center" mb={5}>
            <PrismicRichText field={primary.description} />
          </Box>
        )}

        {/* Blog post cards */}
        {options.length > 0 && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            justifyContent="center"
          >
            {options.map((option: any, index: number) => (
              <Card
                key={index}
                sx={{
                  width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* Card image */}
                {option.image?.url && (
                  <CardMedia
                    sx={{
                      width: "100%",
                      height: 200,
                      position: "relative",
                      overflow: "hidden",
                      "& img": {
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      },
                    }}
                  >
                    <PrismicNextImage
                      field={option.image}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </CardMedia>
                )}

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1, p: 3 }}>
                  {/* Card title */}
                  {option.title && (
                    <Box>
                      <PrismicRichText field={option.title} />
                    </Box>
                  )}

                  {/* Card description */}
                  {option.description && (
                    <Box sx={{ flexGrow: 1 }}>
                      <PrismicRichText field={option.description} fontSize="16px" />
                    </Box>
                  )}

                  {/* CTA button */}
                  {option.buttontext && option.buttonlink?.url && (
                    <Box mt={2}>
                      <Button
                        component={PrismicNextLink}
                        field={option.buttonlink}
                        variant="contained"
                        color="primary"
                        size="medium"
                        sx={{ textTransform: "none", borderRadius: 2 }}
                      >
                        {option.buttontext}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default ResumeBlog;
