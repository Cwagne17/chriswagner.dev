"use client";

import {
  Project,
  PROJECT_STATUS,
  TECHNOLOGIES,
  Technology,
} from "@/types/project";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum([
    PROJECT_STATUS.DRAFT,
    PROJECT_STATUS.PUBLISHED,
    PROJECT_STATUS.ARCHIVED,
  ]),
  technologies: z.array(z.string()).default([]),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  metrics: z.string().optional(),
  situation: z.string().optional(),
  task: z.string().optional(),
  actions: z.array(z.string()).default([]),
  results: z.array(z.string()).default([]),
  assets: z
    .object({
      architecture: z
        .object({
          key: z.string(),
          alt: z.string(),
        })
        .optional(),
    })
    .optional(),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  readonly project?: Project;
  readonly onSave: (project: Partial<Project>) => void;
  readonly onCancel: () => void;
  readonly isLoading?: boolean;
}

export default function ProjectForm({
  project,
  onSave,
  onCancel,
  isLoading,
}: ProjectFormProps) {
  const [newAction, setNewAction] = useState("");
  const [newResult, setNewResult] = useState("");

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || "",
      slug: project?.slug || "",
      description: project?.description || "",
      status: project?.status || PROJECT_STATUS.DRAFT,
      technologies: project?.technologies || [],
      githubUrl: project?.githubUrl || "",
      metrics: project?.metrics || "",
      situation: project?.situation || "",
      task: project?.task || "",
      actions: project?.actions || [],
      results: project?.results || [],
      assets: project?.assets || {},
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    onSave(data);
  };

  const addTechnology = (tech: Technology) => {
    const currentTechnologies = form.getValues("technologies");
    if (!currentTechnologies.includes(tech)) {
      form.setValue("technologies", [...currentTechnologies, tech]);
    }
  };

  const removeTechnology = (index: number) => {
    const currentTechnologies = form.getValues("technologies");
    form.setValue(
      "technologies",
      currentTechnologies.filter((_, i) => i !== index)
    );
  };

  const addAction = () => {
    if (newAction.trim()) {
      const currentActions = form.getValues("actions");
      form.setValue("actions", [...currentActions, newAction.trim()]);
      setNewAction("");
    }
  };

  const removeAction = (index: number) => {
    const currentActions = form.getValues("actions");
    form.setValue(
      "actions",
      currentActions.filter((_, i) => i !== index)
    );
  };

  const addResult = () => {
    if (newResult.trim()) {
      const currentResults = form.getValues("results");
      form.setValue("results", [...currentResults, newResult.trim()]);
      setNewResult("");
    }
  };

  const removeResult = (index: number) => {
    const currentResults = form.getValues("results");
    form.setValue(
      "results",
      currentResults.filter((_, i) => i !== index)
    );
  };

  const handleArchitectureUpload = (key: string) => {
    const currentAssets = form.getValues("assets") || {};
    form.setValue("assets", {
      ...currentAssets,
      architecture: {
        key,
        alt: currentAssets.architecture?.alt || "",
      },
    });
  };

  const handleArchitectureAltChange = (alt: string) => {
    const currentAssets = form.getValues("assets") || {};
    form.setValue("assets", {
      ...currentAssets,
      architecture: {
        key: currentAssets.architecture?.key || "",
        alt,
      },
    });
  };

  const watchedTechnologies = form.watch("technologies");
  const watchedActions = form.watch("actions");
  const watchedResults = form.watch("results");
  const watchedAssets = form.watch("assets");

  const availableTechnologies = Object.values(TECHNOLOGIES).filter(
    (tech) => !watchedTechnologies.includes(tech)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold">
            {project ? "Edit Project" : "Create New Project"}
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug *</FormLabel>
                    <FormControl>
                      <Input placeholder="project-slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Project description"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PROJECT_STATUS.DRAFT}>
                        Draft
                      </SelectItem>
                      <SelectItem value={PROJECT_STATUS.PUBLISHED}>
                        Published
                      </SelectItem>
                      <SelectItem value={PROJECT_STATUS.ARCHIVED}>
                        Archived
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Technologies
              </label>
              <div className="mb-2">
                <Select
                  onValueChange={(value: string) => {
                    if (value) {
                      addTechnology(value as Technology);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a technology..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTechnologies.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                {watchedTechnologies.map((tech, index) => (
                  <span
                    key={`project-tech-${tech}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    {tech}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeTechnology(index)}
                      className="h-4 w-4 text-muted-foreground hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metrics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metrics</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 90+ min saved per host • 91 STIG controls automated"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* STAR Model Content */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">STAR Model Content</h3>

              <FormField
                control={form.control}
                name="situation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Situation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the context and background of the project"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what needed to be accomplished"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Actions
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    placeholder="Add action taken"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAction();
                      }
                    }}
                  />
                  <Button type="button" onClick={addAction} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {watchedActions.map((action, index) => (
                    <div
                      key={`project-action-${action.substring(0, 20)}`}
                      className="flex items-start gap-2 p-3 bg-muted rounded-lg"
                    >
                      <span className="text-sm flex-1">{action}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeAction(index)}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Results
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value)}
                    placeholder="Add result achieved"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addResult();
                      }
                    }}
                  />
                  <Button type="button" onClick={addResult} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {watchedResults.map((result, index) => (
                    <div
                      key={`project-result-${result.substring(0, 20)}`}
                      className="flex items-start gap-2 p-3 bg-muted rounded-lg"
                    >
                      <span className="text-sm flex-1">{result}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeResult(index)}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Diagram Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Architecture Diagram
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                <FileUploader
                  acceptedFileTypes={["image/png", "image/jpeg"]}
                  path="architecture-diagrams/"
                  maxFileCount={1}
                  onUploadSuccess={(event) => {
                    if (event.key) {
                      handleArchitectureUpload(event.key);
                    }
                  }}
                  onUploadError={(error) =>
                    console.error("Upload error:", error)
                  }
                />
                {watchedAssets?.architecture?.key && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      File uploaded: {watchedAssets.architecture.key}
                    </p>
                  </div>
                )}
              </div>
              <Input
                type="text"
                value={watchedAssets?.architecture?.alt || ""}
                onChange={(e) => handleArchitectureAltChange(e.target.value)}
                placeholder="Alt text for architecture diagram"
                className="mt-2"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {(() => {
                  if (isLoading) return "Saving...";
                  return project ? "Update Project" : "Create Project";
                })()}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
