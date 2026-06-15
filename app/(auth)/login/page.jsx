import { signIn } from "@/lib/auth";

export default async function LoginPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to your account to continue</p>
        
        {/* We use a Server Action inside a standard form */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" }); 
          }}
        >
          <button type="submit" style={styles.button}>
            <svg style={styles.icon} viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.48 3.77v3.12h4a11.5 11.5 0 0 0 3.53-8.74z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4-3.12c-1.11.74-2.53 1.18-3.93 1.18-3.03 0-5.6-2.05-6.51-4.82H1.31v3.2A12 12 0 0 0 12 24z"/>
              <path fill="#FBBC05" d="M5.49 14.33A7.13 7.13 0 0 1 5.08 12c0-.81.14-1.59.41-2.33V6.47H1.31A12 12 0 0 0 0 12c0 2.05.52 4 1.31 5.53l4.18-3.2z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.77 11.77 0 0 0 12 0 12 12 0 0 0 1.31 6.47l4.18 3.2c.91-2.77 3.48-4.82 6.51-4.82z"/>
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}

// Basic inline styles for a clean layout
const styles = {
  container: { display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6" },
  card: { padding: "2.5rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", textAlign: "center", maxWidth: "400px", width: "100%" },
  title: { fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#1f2937" },
  subtitle: { fontSize: "0.875rem", color: "#6b7280", marginBottom: "2rem" },
  button: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", width: "100%", padding: "0.75rem", border: "1px solid #e5e7eb", borderRadius: "6px", backgroundColor: "#fff", color: "#374151", fontWeight: "600", cursor: "pointer", transition: "background-color 0.2s" },
  icon: { display: "block" }
};