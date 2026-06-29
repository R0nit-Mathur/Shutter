import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Shutter — AI Visibility Platform";
    const category = searchParams.get("category") || "Platform";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#05070A",
            padding: "80px",
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          {/* Decorative glowing background blobs */}
          <div
            style={{
              position: "absolute",
              top: "-150px",
              left: "-150px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              backgroundColor: "rgba(79, 140, 255, 0.15)",
              filter: "blur(80px)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-150px",
              right: "-150px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              backgroundColor: "rgba(112, 163, 255, 0.1)",
              filter: "blur(80px)",
              display: "flex",
            }}
          />

          {/* Top category pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 24px",
              borderRadius: "50px",
              backgroundColor: "rgba(79, 140, 255, 0.1)",
              border: "1px solid rgba(79, 140, 255, 0.2)",
              color: "#4F8CFF",
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "40px",
            }}
          >
            {category}
          </div>

          {/* Primary headline */}
          <div
            style={{
              display: "flex",
              textAlign: "center",
              color: "white",
              fontSize: "64px",
              fontWeight: "bold",
              letterSpacing: "-1.5px",
              lineHeight: 1.2,
              maxWidth: "1000px",
              marginBottom: "40px",
            }}
          >
            {title}
          </div>

          {/* Footer details */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "auto",
            }}
          >
            {/* Shutter abstract icon */}
            <div
              style={{
                display: "flex",
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #4F8CFF, #70a3ff)",
                boxShadow: "0 4px 10px rgba(79, 140, 255, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: "16px", height: "16px", stroke: "white", fill: "none" }}
                strokeWidth="2.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "20px",
                fontWeight: "600",
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              SHUTTER
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
