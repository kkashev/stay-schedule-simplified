import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Pino Apartment</h3>
            <p className="text-sm text-gray-600">
              Вашата зимна приказка в Пампорово
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Контакти</h3>
            <p className="text-sm text-gray-600">
              Телефон: +359886391580
            </p>
            <p className="text-sm text-gray-600">
              Email: kkashev@gmail.com
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Правна информация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900">
                  Политика за поверителност
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-600 hover:text-gray-900">
                  Общи условия
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-600 hover:text-gray-900">
                  Политика за бисквитките
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Pino Apartment. Всички права запазени.
        </div>
      </div>
    </footer>
  );
}