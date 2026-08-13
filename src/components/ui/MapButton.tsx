export function MapButton({
  naver,
  google,
}: {
  naver?: string;
  google?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {naver ? (
        <a
          href={naver}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 t-body-s no-underline"
          style={{
            background: "var(--ink)",
            color: "var(--accent-ink)",
          }}
        >
          <span aria-hidden>🗺</span>
          NAVERマップで開く
        </a>
      ) : null}
      {google ? (
        <a
          href={google}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 t-body-s no-underline border"
          style={{ borderColor: "var(--line)", color: "var(--ink)" }}
        >
          Googleマップ
        </a>
      ) : null}
    </div>
  );
}
