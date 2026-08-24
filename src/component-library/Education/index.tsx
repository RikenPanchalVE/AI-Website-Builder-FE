import { useState, useEffect } from "react";

// ── CourseGrid ─────────────────────────────────────────────────
export const CourseGrid = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.courses || []).map((course: any, i: number) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-[16/9] overflow-hidden bg-muted">
              {course.image ? <img src={course.image} alt={course.title} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-4xl text-primary/20">📚</span></div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground">{course.category}</span>
                {course.level && <span className="text-xs text-muted-foreground">{course.level}</span>}
              </div>
              <h3 className="font-bold text-foreground">{course.title}</h3>
              {course.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-extrabold text-primary">{course.price}</span>
                {course.duration && <span className="text-xs text-muted-foreground">{course.duration}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── CourseGrid2 (also used by Rooms & Suites / Travel Packages / Programs,
//    which all share this component family server-side) ───────
export const CourseGrid2 = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-5xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="space-y-5">
        {(props.courses || []).map((course: any, i: number) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg sm:flex-row">
            <div className="aspect-[16/9] w-full flex-shrink-0 overflow-hidden bg-muted sm:aspect-square sm:w-48">
              {course.image ? <img src={course.image} alt={course.title} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"><span className="text-4xl text-primary/20">📚</span></div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 p-5">
              <div className="flex items-center gap-2">
                {course.category && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground">{course.category}</span>}
                {course.level && <span className="text-xs text-muted-foreground">{course.level}</span>}
              </div>
              <h3 className="font-bold text-foreground">{course.title}</h3>
              {course.description && <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>}
            </div>
            <div className="flex flex-row items-center justify-between gap-1 border-t border-border p-5 sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0">
              <span className="text-lg font-extrabold text-primary">{course.price}</span>
              {course.duration && <span className="text-xs text-muted-foreground">{course.duration}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── LearningPaths ──────────────────────────────────────────────
export const LearningPaths = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-4xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="space-y-4">
        {(props.steps || props.paths || []).map((step: any, i: number) => (
          <div key={i} className="flex items-start gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-md">{step.icon || i + 1}</div>
            <div>
              <h3 className="font-bold text-foreground">{step.title}</h3>
              {step.description && <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>}
              {step.courses && <p className="mt-2 text-xs font-medium text-primary">{step.courses} courses</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── LearningPaths2 (used for the "Our Process" section) ─────────
export const LearningPaths2 = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {(props.steps || props.paths || []).map((step: any, i: number, arr: any[]) => (
          <div key={i} className="relative text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background text-lg font-extrabold text-primary">
              {step.icon || i + 1}
            </div>
            <h3 className="font-bold text-foreground">{step.title}</h3>
            {step.description && <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>}
            {step.courses && <p className="mt-2 text-xs font-medium text-primary">{step.courses} courses</p>}
            {i < arr.length - 1 && (
              <span className="absolute right-[-14%] top-6 hidden text-2xl text-primary/30 lg:block">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── StudentSuccess ─────────────────────────────────────────────
export const StudentSuccess = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(props.testimonials || []).map((t: any, i: number) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <svg key={j} className={`h-4 w-4 ${j < (t.rating || 5) ? "text-yellow-400" : "text-muted/50"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mb-5 text-sm leading-relaxed italic text-muted-foreground">"{t.content}"</p>
            <div className="flex items-center gap-3">
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{t.name?.charAt(0)}</div>
              )}
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── InstructorProfiles ─────────────────────────────────────────
export const InstructorProfiles = (props: any) => (
  <section className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {(props.instructors || []).map((ins: any, i: number) => (
          <div key={i} className="text-center">
            <div className="mx-auto mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md">
              {ins.avatar ? <img src={ins.avatar} alt={ins.name} className="h-28 w-28 object-cover" /> : (
                <div className="flex h-28 w-28 items-center justify-center text-2xl font-bold text-primary">{ins.name?.split(" ").map((n: string) => n[0]).join("")}</div>
              )}
            </div>
            <h3 className="font-bold text-foreground">{ins.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-primary">{ins.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── InstructorProfiles2 ────────────────────────────────────────
export const InstructorProfiles2 = (props: any) => (
  <section className="py-16 sm:py-20 bg-muted/30">
    <div className="mx-auto max-w-6xl px-6">
      {props.title && <h2 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{props.title}</h2>}
      {props.subtitle && <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{props.subtitle}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(props.instructors || []).map((ins: any, i: number) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
              {ins.avatar ? <img src={ins.avatar} alt={ins.name} className="h-full w-full object-cover" /> : (
                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-primary">{ins.name?.split(" ").map((n: string) => n[0]).join("")}</div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-foreground">{ins.name}</h3>
              <p className="text-sm font-medium text-primary">{ins.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
