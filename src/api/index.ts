export async function fetchAndParse<T>(input: RequestInfo, init: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  if (response.status >= 400) {
    throw {
      status: response.status,
      statusText: response.statusText,
      text: await response.text(),
      toString() {
        return `${this.status} - ${this.text || this.statusText}`;
      },
    };
  }
  try {
    const data = await response.json();
    return data as T;
  } catch (e) {
    return (response as unknown) as T;
  }
}