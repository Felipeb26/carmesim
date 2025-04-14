export function checkAndReset({ check, resetCallback, callback }: { check: boolean, resetCallback: () => unknown, callback: () => unknown }) {
    if (check) {
        resetCallback()
        setTimeout(() => callback(), 0)
    }
}