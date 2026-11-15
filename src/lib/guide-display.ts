export function displayGuideText(answer: string): string { return answer.replace(/\[action:[^\]]*(?:\]|$)/g, '').trim(); }
