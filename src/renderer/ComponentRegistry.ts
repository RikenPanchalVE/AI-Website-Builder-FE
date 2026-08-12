import { lazy } from "react";

import {
  WhyChooseUs,
  Testimonials,
  BrandShowcase,
  NewsletterSignup,
  InstagramFeed,
  FAQPreview,
  ContactPreview,
  StoreLocator,
  PageHero,
  Breadcrumbs,
  AboutStory,
  AboutValues,
  TeamSection,
  CTABanner,
  ContactInfo,
  ContactForm,
  MapEmbed,
  BlogGrid,
  FAQAccordion,
  LegalContent,
  BlogPreview,
} from "@/component-library/Common";

import {
  MenuHighlights,
  DailySpecials,
  ChefTable,
  ReservationForm,
} from "@/component-library/Restaurant";

import {
  Services,
  AppointmentBooking,
  DoctorProfiles,
  HealthResources,
} from "@/component-library/Healthcare";

import {
  CourseGrid,
  LearningPaths,
  StudentSuccess,
  InstructorProfiles,
} from "@/component-library/Education";

import {
  PropertyGrid,
  PropertySearch,
  NeighborhoodGuide,
  AgentProfiles,
} from "@/component-library/RealEstate";

import {
  DestinationGrid,
  TravelDeals,
  PackageGrid,
  TravelGuides,
} from "@/component-library/Travel";

import {
  PetCareTips,
  PetGroomingBooking,
} from "@/component-library/PetStore";

import {
  VehicleCard,
  VehicleGrid,
  ServicePackages as AutomotiveServicePackages,
} from "@/component-library/Automotive";

import {
  ServicePackages as HomeServicePackages,
  BeforeAfterGallery,
} from "@/component-library/HomeServices";

const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  Navbar1: lazy(() => import("@/component-library/Navbar/Navbar1")),
  Navbar2: lazy(() => import("@/component-library/Navbar/Navbar2")),
  Navbar3: lazy(() => import("@/component-library/Navbar/Navbar3")),
  Hero1: lazy(() => import("@/component-library/Hero/Hero1")),
  Hero2: lazy(() => import("@/component-library/Hero/Hero2")),
  Hero3: lazy(() => import("@/component-library/Hero/Hero3")),
  Hero4: lazy(() => import("@/component-library/Hero/Hero4")),
  Hero5: lazy(() => import("@/component-library/Hero/Hero5")),
  About1: lazy(() => import("@/component-library/About/About1")),
  About2: lazy(() => import("@/component-library/About/About2")),
  Services1: lazy(() => import("@/component-library/Services/Services1")),
  Services2: lazy(() => import("@/component-library/Services/Services2")),
  Services3: lazy(() => import("@/component-library/Services/Services3")),
  Services4: lazy(() => import("@/component-library/Services/Services4")),
  Gallery1: lazy(() => import("@/component-library/Gallery/Gallery1")),
  Gallery2: lazy(() => import("@/component-library/Gallery/Gallery2")),
  Portfolio1: lazy(() => import("@/component-library/Portfolio/Portfolio1")),
  Portfolio2: lazy(() => import("@/component-library/Portfolio/Portfolio2")),
  Portfolio3: lazy(() => import("@/component-library/Portfolio/Portfolio3")),
  Pricing1: lazy(() => import("@/component-library/Pricing/Pricing1")),
  Pricing2: lazy(() => import("@/component-library/Pricing/Pricing2")),
  FAQ1: lazy(() => import("@/component-library/FAQ/FAQ1")),
  FAQ2: lazy(() => import("@/component-library/FAQ/FAQ2")),
  Testimonials1: lazy(() => import("@/component-library/Testimonials/Testimonials1")),
  Testimonials2: lazy(() => import("@/component-library/Testimonials/Testimonials2")),
  Testimonials3: lazy(() => import("@/component-library/Testimonials/Testimonials3")),
  CTA1: lazy(() => import("@/component-library/CTA/CTA1")),
  CTA2: lazy(() => import("@/component-library/CTA/CTA2")),
  Contact1: lazy(() => import("@/component-library/Contact/Contact1")),
  Contact2: lazy(() => import("@/component-library/Contact/Contact2")),
  Footer1: lazy(() => import("@/component-library/Footer/Footer1")),
  Footer2: lazy(() => import("@/component-library/Footer/Footer2")),
  Footer3: lazy(() => import("@/component-library/Footer/Footer3")),
  WhyChooseUs,
  Testimonials,
  BrandShowcase,
  NewsletterSignup,
  InstagramFeed,
  FAQPreview,
  ContactPreview,
  StoreLocator,
  PageHero,
  Breadcrumbs,
  AboutStory,
  AboutValues,
  TeamSection,
  CTABanner,
  ContactInfo,
  ContactForm,
  MapEmbed,
  BlogGrid,
  BlogPreview,
  FAQAccordion,
  LegalContent,
  MenuHighlights,
  DailySpecials,
  ChefTable,
  ReservationForm,
  Services,
  AppointmentBooking,
  DoctorProfiles,
  HealthResources,
  CourseGrid,
  LearningPaths,
  StudentSuccess,
  InstructorProfiles,
  PropertyGrid,
  PropertySearch,
  NeighborhoodGuide,
  AgentProfiles,
  DestinationGrid,
  TravelDeals,
  PackageGrid,
  TravelGuides,
  PetCareTips,
  PetGroomingBooking,
  VehicleCard,
  VehicleGrid,
  AutomotiveServicePackages,
  HomeServicePackages,
  BeforeAfterGallery,
};

export default ComponentRegistry;
