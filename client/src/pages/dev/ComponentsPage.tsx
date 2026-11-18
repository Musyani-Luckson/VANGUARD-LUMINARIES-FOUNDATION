import React, { useState } from "react";
import { CalendarDays, Info, Search, Sparkles } from "lucide-react";
import Avatar from "../../components/Avatar";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Skeleton from "../../components/Skeleton";
import Toast from "../../components/Toast";
import { BRAND } from "../../globals/brand";
import { ROUTES } from "../../globals/constants";

// ─── Components preview (development only) ───────────────────────────────────
// Every design-system component with sample content, so the set can be
// reviewed in one place. Registered in AppRouter only when import.meta.env.DEV.

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 border-t border-line pt-6">
      <h2 className="text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function ComponentsPage() {
  const [selected, setSelected] = useState<string>(BRAND.programmes[0].name);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastShown, setToastShown] = useState(true);

  return (
    <div className="min-h-dvh py-8">
      <div className="page-container space-y-8">
        <header>
          <p className="eyebrow text-gold-text">Development</p>
          <h1 className="text-4xl">Components</h1>
          <p className="text-sm text-muted">
            Design-system building blocks, no business logic ·{" "}
            <a href={ROUTES.DEV_FOUNDATION} className="text-info underline">
              foundation
            </a>
          </p>
        </header>

        <Section title="Button">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Register</Button>
            <Button variant="secondary">Learn more</Button>
            <Button variant="ghost">Later</Button>
            <Button variant="danger">Cancel booking</Button>
            <Button icon={<CalendarDays className="h-4 w-4" />} variant="secondary">
              With icon
            </Button>
            <Button loading>Sending</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Section>

        <Section title="Badge / Tag">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="info">Webinar</Badge>
            <Badge tone="success" icon={<Sparkles />}>Open</Badge>
            <Badge tone="warning">Few seats left</Badge>
            <Badge tone="danger">Full</Badge>
            <Badge>Default</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Badge appearance="status" tone="success">Registration open</Badge>
            <Badge appearance="status" tone="warning">Closing soon</Badge>
            <Badge appearance="status" tone="danger">Closed</Badge>
          </div>
        </Section>

        <Section title="Card">
          <p className="text-xs text-muted">Selectable · click to select</p>
          <div className="page-grid">
            {BRAND.programmes.slice(0, 4).map((p) => (
              <Card key={p.name} className="col-span-2" selected={selected === p.name} onClick={() => setSelected(p.name)}>
                <Card.Media ratio="wide" />
                <Card.Body>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="line-clamp-2 text-xs text-muted">{p.summary}</p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Form · InputField">
          <div className="max-w-md space-y-4">
            <InputField name="search" variant="filled" icon={<Search />} placeholder="Search" />
            <Form>
              <Form.Field label="Full name" htmlFor="name" required>
                <InputField name="name" placeholder="Your name" />
              </Form.Field>
              <Form.Field label="Email" htmlFor="email" hint="We only use it to confirm your seat.">
                <InputField name="email" type="email" placeholder="you@example.com" />
              </Form.Field>
              <Form.Field label="Phone" htmlFor="phone" error="Enter a valid phone number.">
                <InputField name="phone" defaultValue="0977" error="Enter a valid phone number." />
              </Form.Field>
              <Form.Field label="Disabled" htmlFor="disabled">
                <InputField name="disabled" disabled value="Not editable" readOnly />
              </Form.Field>
            </Form>
          </div>
        </Section>

        <Section title="Modal">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setSheetOpen(true)}>Open sheet</Button>
            <Button variant="secondary" onClick={() => setDialogOpen(true)}>
              Open dialog
            </Button>
          </div>
          <Modal
            variant="sheet"
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            icon={<Info />}
            title="Master Class registration"
            description="Seats are limited; we confirm by email."
            footer={
              <Button fullWidth size="lg" onClick={() => setSheetOpen(false)}>
                Reserve a seat
              </Button>
            }
          >
            <div className="space-y-3">
              <InputField name="sheet-name" placeholder="Full name" />
              <InputField name="sheet-email" type="email" placeholder="Email" />
            </div>
          </Modal>
          <Modal
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Cancel your seat?"
            description="Someone on the waiting list will get it."
            footer={
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                  Keep it
                </Button>
                <Button variant="danger" onClick={() => setDialogOpen(false)}>
                  Cancel seat
                </Button>
              </div>
            }
          />
        </Section>

        <Section title="Toast">
          <div className="max-w-md space-y-3">
            {toastShown ? (
              <Toast title="Seat reserved" message="Leadership Training" onDismiss={() => setToastShown(false)} />
            ) : (
              <Button size="sm" variant="secondary" onClick={() => setToastShown(true)}>
                Show again
              </Button>
            )}
            <Toast title="Saved" message="Seminar added to your calendar" tone="info" action={{ label: "View", onClick: () => undefined }} />
            <Toast title="Couldn't send" message="Check your connection" tone="error" />
          </div>
        </Section>

        <Section title="Avatar">
          <div className="flex items-center gap-3">
            <Avatar name={BRAND.shortName} shape="rounded" size="lg" />
            <Avatar name="Mwila Banda" size="lg" />
            <Avatar name="Mwila Banda" />
            <Avatar name="Chanda" size="sm" />
          </div>
        </Section>

        <Section title="Skeleton · Loader">
          <div className="page-grid">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="col-span-2 space-y-2">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton.Text lines={2} />
              </div>
            ))}
          </div>
          <Loader variant="inline" message="Loading…" />
        </Section>

        <Section title="EmptyState">
          <div className="max-w-md rounded-xl border border-line">
            <EmptyState
              icon={<CalendarDays />}
              title="No upcoming events"
              description="New seminars and master classes appear here."
              action={<Button>See past events</Button>}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}

export default ComponentsPage;
