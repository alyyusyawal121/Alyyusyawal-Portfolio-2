
import Link from 'next/link'


interface ButtonProps {
    text: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'outline';
}

const Button = ({text, url, variant}: ButtonProps) => {
    const baseStyle = "px-6 py-3 font-semibold rounded-xl transition-all inline-block text-center";
    let variantStyle = '';

    if (variant === 'primary') {
        variantStyle = "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30";
    } else if (variant === 'secondary') {
        variantStyle = "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700";
    } else if (variant === 'outline') {
        variantStyle = "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/30";
    }
  return (
    <>
        <Link href={url} className={`${baseStyle} ${variantStyle}`}>
            {text}
        </Link>
    </>
  )
}

export default Button