# Dynatrace Webhook Setup Guide

This guide explains how to configure Dynatrace to automatically trigger the `dynatrace-anomaly` GitHub Actions workflow when a problem is detected.

---

## How it works

```
Dynatrace detects anomaly
        ↓
Dynatrace Problem Notification fires webhook
        ↓
POST to GitHub repository_dispatch API
        ↓
dynatrace-anomaly.yml workflow runs
        ↓
GitHub Issue created with anomaly details
        ↓
Issue assigned to @copilot (anomaly-resolution agent)
        ↓
Copilot opens a PR with a fix
```

---

## Step 1 — Create a GitHub Personal Access Token

The Dynatrace webhook needs a token to call the GitHub API.

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens**
2. Create a new token with:
   - **Repository access:** `beardofedu/hackathon-winners`
   - **Permissions:** `Issues: Read and write`, `Actions: Read and write`
3. Copy the token — you'll need it in Step 3

---

## Step 2 — Configure the webhook in Dynatrace

1. In Dynatrace, go to **Settings → Integrations → Problem notifications**
2. Click **Add notification → Custom integration (Webhook)**
3. Fill in the fields:

| Field | Value |
|-------|-------|
| **Name** | `GitHub Copilot Issue Creator` |
| **Webhook URL** | `https://api.github.com/repos/beardofedu/hackathon-winners/dispatches` |
| **Method** | `POST` |
| **Accept any SSL certificate** | Enabled |

4. Under **Headers**, add:
   ```
   Authorization: Bearer YOUR_GITHUB_PAT
   Content-Type: application/json
   Accept: application/vnd.github.v3+json
   ```

5. Under **Payload**, paste the template from `webhook-payload-template.json` (see below)

6. Under **Alerting profile**, select the profile that covers the anomaly types you want (response time, error rate, availability)

---

## Step 3 — Payload template

Paste this as the webhook payload in Dynatrace. The `{...}` placeholders are Dynatrace template variables that get replaced at send time.

```json
{
  "event_type": "dynatrace-anomaly",
  "client_payload": {
    "problemId": "{ProblemID}",
    "problemTitle": "{ProblemTitle}",
    "severityLevel": "{ProblemSeverity}",
    "status": "{State}",
    "startTime": "{ProblemOpenTime}",
    "endTime": null,
    "problemUrl": "{ProblemURL}",
    "affectedEntities": [
      {
        "name": "{ImpactedEntityNames}",
        "type": "SERVICE",
        "entityId": "{ImpactedEntity}"
      }
    ],
    "rootCauseEntity": {
      "name": "{ImpactedEntityNames}",
      "type": "SERVICE"
    },
    "impactLevel": "{ProblemImpact}",
    "tags": "{Tags}",
    "anomalyDetails": {
      "metric": "{ProblemTitle}",
      "baseline": "See Dynatrace problem details",
      "current": "See Dynatrace problem details",
      "threshold": "Auto-baseline",
      "affectedEndpoint": "{ImpactedEntityNames}",
      "affectedRequests": "See Dynatrace problem details",
      "possibleCause": "{ProblemDetailsText}"
    }
  }
}
```

> **Note:** Dynatrace template variables like `{ProblemID}` are automatically populated by Dynatrace when it fires the webhook. See the [Dynatrace webhook template variables reference](https://docs.dynatrace.com/docs/deliver/problem-notifications/webhook-integration#webhook-template-variables) for the full list.

---

## Step 4 — Test the integration

### Option A — Test from Dynatrace
In the Dynatrace webhook configuration page, click **Send test notification**. This fires a test payload to GitHub.

### Option B — Test with mock data (no Dynatrace required)
Trigger the workflow manually from GitHub:

1. Go to **Actions → 🚨 Dynatrace Anomaly → GitHub Issue**
2. Click **Run workflow**
3. Choose an anomaly type and severity
4. Click **Run workflow**

A new issue will be created and assigned to `@copilot`.

### Option C — Simulate via curl
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_GITHUB_PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/beardofedu/hackathon-winners/dispatches \
  -d @webhook-payload-example.json
```

---

## Filtering anomaly types

To only create issues for specific anomaly severities or types, edit the `dynatrace-anomaly.yml` workflow and add a condition to the `create_issue` step:

```yaml
- name: Create GitHub issue
  if: steps.anomaly.outputs.severity_label == 'severity:critical'
  ...
```

Or filter in Dynatrace by creating a custom alerting profile that only fires for `PERFORMANCE` and `AVAILABILITY` severity levels.

---

## Required GitHub secrets (for production use)

No additional secrets are needed — the workflow uses `GITHUB_TOKEN` which is automatically provided. The PAT is only needed for Dynatrace to call the GitHub API.

If you want to also have the workflow call back into Dynatrace (e.g., to add a comment on the problem), add:

| Secret name | Value |
|-------------|-------|
| `DYNATRACE_API_TOKEN` | Your Dynatrace API v2 token with `problems.read` scope |
| `DYNATRACE_ENV_URL` | Your environment URL (e.g., `https://xyz12345.live.dynatrace.com`) |
