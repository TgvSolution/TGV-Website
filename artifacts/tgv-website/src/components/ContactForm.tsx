import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { t, lang } = useLanguage();
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const endpoint =
    import.meta.env.VITE_CONTACT_ENDPOINT ?? "/api/contact";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
    } catch {
      setState("error");
    }
  };

  const inputClass =
    "w-full bg-transparent border border-border px-5 py-4 text-sm font-light placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300 autofill:bg-transparent";

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Left — headline */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6 leading-tight">
          {t("cta.title")} <br />
          <span className="text-primary italic">{t("cta.titleAccent")}</span>
        </h2>
        <p className="text-xl text-muted-foreground font-light leading-relaxed mb-10">
          {t("cta.desc")}
        </p>
        <div className="border-l-2 border-primary pl-6 space-y-4 text-sm text-muted-foreground font-light">
          <p>request@tgvsolution.ca</p>
          <p>Québec, Canada</p>
        </div>
      </motion.div>

      {/* Right — form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <AnimatePresence mode="wait">
          {state === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-primary/30 bg-primary/5 px-8 py-12 flex flex-col items-center text-center gap-4"
            >
              <CheckCircle className="text-primary" size={40} />
              <p className="text-lg font-light">{t("form.success")}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={t("form.name")}
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <input
                    name="company"
                    type="text"
                    placeholder={t("form.company")}
                    value={form.company}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t("form.email")}
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder={t("form.phone")}
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <textarea
                name="message"
                required
                rows={6}
                placeholder={t("form.message")}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />

              {state === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 text-sm text-red-400 font-light"
                >
                  <AlertCircle size={16} />
                  {t("form.error")}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full bg-primary text-primary-foreground py-5 text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t("form.submitting")}
                  </>
                ) : (
                  <>
                    {t("form.submit")}
                    <Send size={16} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
