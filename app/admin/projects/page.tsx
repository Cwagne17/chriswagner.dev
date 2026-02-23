"use client";

import type { Project } from "@/types/project";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button, IconButton } from "@/components/ui";
import { Edit, Eye, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import AuthWrapper from "../../../components/AuthWrapper";
import { AuthGroups } from "../../../lib/auth-groups";

type ProjectStatus = "Draft" | "Published";

type AdminProject = {
  id: number;
  status: ProjectStatus;
  lastUpdated: string;
  views: number;
  data: Project;
};

type LegacyProjectRow = {
  id: number;
  title?: string;
  description?: string;
  status?: ProjectStatus;
  lastUpdated?: string;
  views?: number;
  data?: Project;
};

type ProjectRow = AdminProject | LegacyProjectRow;

type ProjectFormState = {
  status: ProjectStatus;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  metrics: string[];
  challenge: string;
  solution: string;
  process: string[];
  results: string[];
  architectureImage: string;
  architectureAlt: string;
  github: string;
};

const DEFAULT_GRADIENT = "from-[color:var(--primary)] to-[color:var(--accent-hover)]";

const TECHNOLOGY_OPTIONS = [
  "AWS",
  "Kubernetes",
  "Terraform",
  "Docker",
  "CircleCI",
  "Ansible",
  "TypeScript",
  "Python",
  "Go",
  "GitHub",
  "AWS CDK",
  "Amazon WorkSpaces",
  "AWS Managed AD",
  "SAML 2.0",
  "CI/CD",
] as const;

const INITIAL_PROJECTS: AdminProject[] = [
  {
    id: 1,
    status: "Published",
    lastUpdated: "2024-01-15",
    views: 245,
    data: {
      title: "AWS Cloud Infrastructure",
      description: "Serverless architecture with Lambda and DynamoDB",
      technologies: ["AWS", "Lambda", "DynamoDB"],
      link: "https://github.com/Cwagne17",
      metrics: "99.9% uptime • 40% cost reduction",
      gradient: DEFAULT_GRADIENT,
      slug: "aws-cloud-infrastructure",
      caseStudy: {
        challenge: "Legacy infra lacked scalability and repeatable deployments.",
        solution: "Designed and deployed serverless architecture using AWS managed services.",
        process: ["Discovery and architecture", "IaC implementation", "Deployment and handoff"],
        results: ["Improved reliability", "Lowered operational cost", "Faster release cycles"],
        architecture: {
          image: "/diagrams/test.drawio.png",
          alt: "AWS serverless architecture diagram",
        },
        resources: {
          github: "https://github.com/Cwagne17",
        },
      },
    },
  },
  {
    id: 2,
    status: "Draft",
    lastUpdated: "2024-01-10",
    views: 89,
    data: {
      title: "STIG Compliance Automation",
      description: "Automated security compliance checking system",
      technologies: ["Ansible", "Kubernetes", "Automation"],
      link: "https://github.com/Cwagne17",
      metrics: "90+ min saved per host • 100% audit-ready",
      gradient: DEFAULT_GRADIENT,
      slug: "stig-compliance-automation",
      caseStudy: {
        challenge: "Manual compliance checks were slow and inconsistent.",
        solution: "Implemented policy automation and evidence generation workflows.",
        process: ["Control mapping", "Automation role development", "Pipeline integration"],
        results: ["Reduced manual effort", "Increased consistency", "Improved audit readiness"],
        architecture: {
          image: "/diagrams/test.drawio.png",
          alt: "Compliance automation architecture",
        },
        resources: {
          github: "https://github.com/Cwagne17",
        },
      },
    },
  },
  {
    id: 3,
    status: "Published",
    lastUpdated: "2024-01-08",
    views: 156,
    data: {
      title: "VDI Infrastructure",
      description: "Virtual desktop infrastructure on AWS WorkSpaces",
      technologies: ["AWS", "Amazon WorkSpaces", "Managed AD"],
      link: "https://github.com/Cwagne17",
      metrics: "< 1 hour provisioning • 80% IT ticket reduction",
      gradient: DEFAULT_GRADIENT,
      slug: "vdi-infrastructure",
      caseStudy: {
        challenge: "Desktop provisioning was manual and too slow.",
        solution: "Built self-service desktop provisioning integrated with enterprise AD.",
        process: ["Baseline image design", "Service catalog buildout", "Lifecycle automation"],
        results: ["Faster provisioning", "Lower support burden", "Improved consistency"],
        architecture: {
          image: "/diagrams/test.drawio.png",
          alt: "VDI architecture with WorkSpaces and AD",
        },
        resources: {
          github: "https://github.com/Cwagne17",
        },
      },
    },
  },
];

const DEFAULT_FORM_STATE: ProjectFormState = {
  status: "Draft",
  title: "",
  slug: "",
  description: "",
  technologies: [],
  metrics: [],
  challenge: "",
  solution: "",
  process: [],
  results: [],
  architectureImage: "",
  architectureAlt: "",
  github: "",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeProject(project: ProjectRow): AdminProject {
  if (project.data) {
    return {
      id: project.id,
      status: project.status ?? "Draft",
      lastUpdated: project.lastUpdated ?? new Date().toISOString().slice(0, 10),
      views: project.views ?? 0,
      data: project.data,
    };
  }

  return {
    id: project.id,
    status: project.status ?? "Draft",
    lastUpdated: project.lastUpdated ?? new Date().toISOString().slice(0, 10),
    views: project.views ?? 0,
    data: {
      title: project.title ?? "Untitled Project",
      description: project.description ?? "",
      technologies: [],
      link: "",
      metrics: "",
      gradient: DEFAULT_GRADIENT,
      slug: slugify(project.title ?? "untitled-project"),
      caseStudy: {
        challenge: "",
        solution: "",
        process: [],
        results: [],
        architecture: {
          image: "",
          alt: "",
        },
        resources: {},
      },
    },
  };
}

function splitMetricString(metrics: string): string[] {
  return metrics
    .split("•")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toFormState(project: ProjectRow): ProjectFormState {
  const normalized = normalizeProject(project);

  return {
    status: normalized.status,
    title: normalized.data.title,
    slug: normalized.data.slug,
    description: normalized.data.description,
    technologies: normalized.data.technologies,
    metrics: splitMetricString(normalized.data.metrics),
    challenge: normalized.data.caseStudy.challenge,
    solution: normalized.data.caseStudy.solution,
    process: normalized.data.caseStudy.process,
    results: normalized.data.caseStudy.results,
    architectureImage: normalized.data.caseStudy.architecture.image,
    architectureAlt: normalized.data.caseStudy.architecture.alt,
    github: normalized.data.caseStudy.resources.github ?? "",
  };
}

function toProjectData(form: ProjectFormState): Project {
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    technologies: form.technologies,
    link: form.github.trim(),
    metrics: form.metrics.join(" • "),
    gradient: DEFAULT_GRADIENT,
    slug: form.slug,
    caseStudy: {
      challenge: form.challenge.trim(),
      solution: form.solution.trim(),
      process: form.process,
      results: form.results,
      architecture: {
        image: form.architectureImage.trim(),
        alt: form.architectureAlt.trim(),
      },
      resources: {
        ...(form.github.trim() ? { github: form.github.trim() } : {}),
      },
    },
  };
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  );
}

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  readOnly = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-[color:var(--primary)] read-only:cursor-not-allowed read-only:opacity-80"
    />
  );
}

function TextAreaInput({
  id,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-[color:var(--primary)]"
    />
  );
}

function ChipList({
  items,
  onRemove,
}: {
  items: string[];
  onRemove: (item: string) => void;
}) {
  return (
    <div className="max-h-28 overflow-y-auto rounded-lg border border-border bg-background/60 p-2">
      <div className="flex flex-wrap gap-2">
        {items.length === 0 && (
          <span className="px-2 py-1 text-xs text-muted-foreground">No items added.</span>
        )}
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs">
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              className="text-muted-foreground hover:text-foreground"
              aria-label={`Remove ${item}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({
  isOpen,
  mode,
  formData,
  technologyValue,
  metricInput,
  processInput,
  resultInput,
  onTechnologyValueChange,
  onMetricInputChange,
  onProcessInputChange,
  onResultInputChange,
  onChange,
  onAddTechnology,
  onRemoveTechnology,
  onAddMetric,
  onRemoveMetric,
  onAddProcess,
  onRemoveProcess,
  onAddResult,
  onRemoveResult,
  onImageUpload,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  mode: "create" | "edit";
  formData: ProjectFormState;
  technologyValue: string;
  metricInput: string;
  processInput: string;
  resultInput: string;
  onTechnologyValueChange: (value: string) => void;
  onMetricInputChange: (value: string) => void;
  onProcessInputChange: (value: string) => void;
  onResultInputChange: (value: string) => void;
  onChange: <K extends keyof ProjectFormState>(field: K, value: ProjectFormState[K]) => void;
  onAddTechnology: () => void;
  onRemoveTechnology: (item: string) => void;
  onAddMetric: () => void;
  onRemoveMetric: (item: string) => void;
  onAddProcess: () => void;
  onRemoveProcess: (item: string) => void;
  onAddResult: () => void;
  onRemoveResult: (item: string) => void;
  onImageUpload: (file: File | null) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl rounded-lg border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-xl font-semibold">
              {mode === "create" ? "Create Project" : "Edit Project"}
            </h2>
            <p className="text-sm text-muted-foreground">Complete project fields and case study content.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close project modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[75vh] space-y-6 overflow-y-auto p-5">
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Core</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => onChange("status", e.target.value as ProjectStatus)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-[color:var(--primary)]"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="slug">Project Slug (auto)</FieldLabel>
                <TextInput id="slug" value={formData.slug} onChange={() => {}} readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <TextInput id="title" value={formData.title} onChange={(v) => onChange("title", v)} placeholder="Project title" />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <TextAreaInput id="description" value={formData.description} onChange={(v) => onChange("description", v)} rows={3} placeholder="Short summary" />
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Metadata</h3>
            <div className="space-y-2">
              <FieldLabel htmlFor="technology-select">Technologies</FieldLabel>
              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  id="technology-select"
                  value={technologyValue}
                  onChange={(e) => onTechnologyValueChange(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-[color:var(--primary)]"
                >
                  <option value="">Select technology</option>
                  {TECHNOLOGY_OPTIONS.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
                <Button variant="secondary" onClick={onAddTechnology}>
                  Add
                </Button>
              </div>
              <ChipList items={formData.technologies} onRemove={onRemoveTechnology} />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="metric-input">Metrics</FieldLabel>
              <div className="flex flex-col gap-2 sm:flex-row">
                <TextInput
                  id="metric-input"
                  value={metricInput}
                  onChange={onMetricInputChange}
                  placeholder="Enter metric then click Add"
                />
                <Button variant="secondary" onClick={onAddMetric}>
                  Add
                </Button>
              </div>
              <ChipList items={formData.metrics} onRemove={onRemoveMetric} />
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Case Study</h3>
            <div className="space-y-2">
              <FieldLabel htmlFor="challenge">Challenge</FieldLabel>
              <TextAreaInput id="challenge" value={formData.challenge} onChange={(v) => onChange("challenge", v)} rows={3} />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="solution">Solution</FieldLabel>
              <TextAreaInput id="solution" value={formData.solution} onChange={(v) => onChange("solution", v)} rows={3} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="process-input">Process Items</FieldLabel>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <TextInput id="process-input" value={processInput} onChange={onProcessInputChange} placeholder="Add process step" />
                  <Button variant="secondary" onClick={onAddProcess}>
                    Add
                  </Button>
                </div>
                <ChipList items={formData.process} onRemove={onRemoveProcess} />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="result-input">Result Items</FieldLabel>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <TextInput id="result-input" value={resultInput} onChange={onResultInputChange} placeholder="Add result" />
                  <Button variant="secondary" onClick={onAddResult}>
                    Add
                  </Button>
                </div>
                <ChipList items={formData.results} onRemove={onRemoveResult} />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Architecture</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="architecture-upload">Architecture Image</FieldLabel>
                <input
                  id="architecture-upload"
                  type="file"
                  accept=".png,.svg,.jpg,.jpeg,image/png,image/svg+xml,image/jpeg"
                  onChange={(e) => onImageUpload(e.target.files?.[0] ?? null)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs"
                />
                {formData.architectureImage && (
                  <p className="text-xs text-muted-foreground break-all">Selected image: {formData.architectureImage}</p>
                )}
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="architecture-alt">Alt Text</FieldLabel>
                <TextInput id="architecture-alt" value={formData.architectureAlt} onChange={(v) => onChange("architectureAlt", v)} placeholder="Architecture description" />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Resources</h3>
            <div className="space-y-2">
              <FieldLabel htmlFor="github">GitHub URL (optional)</FieldLabel>
              <TextInput id="github" value={formData.github} onChange={(v) => onChange("github", v)} placeholder="https://github.com/..." />
            </div>
          </section>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border p-5">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>{mode === "create" ? "Create Project" : "Save Changes"}</Button>
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>(INITIAL_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProjectFormState>(DEFAULT_FORM_STATE);

  const [technologyValue, setTechnologyValue] = useState("");
  const [metricInput, setMetricInput] = useState("");
  const [processInput, setProcessInput] = useState("");
  const [resultInput, setResultInput] = useState("");

  const resetModalInputs = () => {
    setTechnologyValue("");
    setMetricInput("");
    setProcessInput("");
    setResultInput("");
  };

  const openCreateModal = () => {
    setModalMode("create");
    setEditingProjectId(null);
    setFormData(DEFAULT_FORM_STATE);
    resetModalInputs();
    setIsModalOpen(true);
  };

  const openEditModal = (project: ProjectRow) => {
    setModalMode("edit");
    setEditingProjectId(project.id);
    setFormData(toFormState(project));
    resetModalInputs();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProjectId(null);
    setFormData(DEFAULT_FORM_STATE);
    resetModalInputs();
  };

  const updateFormField = <K extends keyof ProjectFormState>(
    field: K,
    value: ProjectFormState[K]
  ) => {
    setFormData((prev) => {
      if (field === "title") {
        const title = String(value);
        return {
          ...prev,
          title,
          slug: slugify(title),
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const addChip = (field: "technologies" | "metrics" | "process" | "results", value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    setFormData((prev) => {
      if (prev[field].includes(trimmed)) {
        return prev;
      }
      return {
        ...prev,
        [field]: [...prev[field], trimmed],
      };
    });
  };

  const removeChip = (field: "technologies" | "metrics" | "process" | "results", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) {
      return;
    }

    const allowedTypes = ["image/png", "image/svg+xml", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    updateFormField("architectureImage", objectUrl);
  };

  const handleSaveProject = () => {
    if (!formData.title.trim() || !formData.slug.trim()) {
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const nextData = toProjectData(formData);

    if (modalMode === "create") {
      const nextId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      const newProject: AdminProject = {
        id: nextId,
        status: formData.status,
        lastUpdated: today,
        views: 0,
        data: nextData,
      };
      setProjects((prev) => [newProject, ...prev]);
      closeModal();
      return;
    }

    if (editingProjectId === null) {
      return;
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === editingProjectId
          ? {
              ...normalizeProject(project),
              status: formData.status,
              lastUpdated: today,
              data: nextData,
            }
          : project
      )
    );
    closeModal();
  };

  const actions = (
    <div className="flex items-center gap-3">
      <Button leftIcon={Plus} onClick={openCreateModal}>
        New Project
      </Button>
    </div>
  );

  return (
    <AdminLayout title="Projects" subtitle="Manage your portfolio projects" actions={actions}>
      <div className="bg-card rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-6 font-medium text-muted-foreground">Project</th>
                <th className="text-left p-6 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-6 font-medium text-muted-foreground">Views</th>
                <th className="text-left p-6 font-medium text-muted-foreground">Last Updated</th>
                <th className="text-left p-6 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const normalized = normalizeProject(project);

                return (
                  <tr key={normalized.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-6">
                      <div>
                        <h3 className="font-medium">{normalized.data.title}</h3>
                        <p className="text-sm text-muted-foreground">{normalized.data.description}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          normalized.status === "Published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {normalized.status}
                      </span>
                    </td>
                    <td className="p-6 text-muted-foreground">{normalized.views}</td>
                    <td className="p-6 text-muted-foreground">{normalized.lastUpdated}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <IconButton icon={Eye} variant="ghost" size="icon" aria-label="View Project" />
                        <IconButton
                          icon={Edit}
                          variant="ghost"
                          size="icon"
                          aria-label="Edit Project"
                          onClick={() => openEditModal(normalized)}
                        />
                        <IconButton icon={Trash2} variant="danger" size="icon" aria-label="Delete Project" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        mode={modalMode}
        formData={formData}
        technologyValue={technologyValue}
        metricInput={metricInput}
        processInput={processInput}
        resultInput={resultInput}
        onTechnologyValueChange={setTechnologyValue}
        onMetricInputChange={setMetricInput}
        onProcessInputChange={setProcessInput}
        onResultInputChange={setResultInput}
        onChange={updateFormField}
        onAddTechnology={() => {
          addChip("technologies", technologyValue);
          setTechnologyValue("");
        }}
        onRemoveTechnology={(item) => removeChip("technologies", item)}
        onAddMetric={() => {
          addChip("metrics", metricInput);
          setMetricInput("");
        }}
        onRemoveMetric={(item) => removeChip("metrics", item)}
        onAddProcess={() => {
          addChip("process", processInput);
          setProcessInput("");
        }}
        onRemoveProcess={(item) => removeChip("process", item)}
        onAddResult={() => {
          addChip("results", resultInput);
          setResultInput("");
        }}
        onRemoveResult={(item) => removeChip("results", item)}
        onImageUpload={handleImageUpload}
        onClose={closeModal}
        onSubmit={handleSaveProject}
      />
    </AdminLayout>
  );
}

export default function AdminProjectsPage() {
  return (
    <AuthWrapper requiredGroup={AuthGroups.ADMINS}>
      <ProjectsPage />
    </AuthWrapper>
  );
}
