"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, Upload, LogOut, LogIn } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-lg sticky top-0 z-50 shadow-lg border-b border-base-300">
      <div className="container mx-auto">
        <div className="flex-1 px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold hover:scale-105 transition-transform"
            prefetch={true}
          >
            <Home className="w-5 h-5 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Video Platform
            </span>
          </Link>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors"
              >
                <User className="w-5 h-5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] shadow-2xl bg-base-100 rounded-box w-64 mt-4 py-2 border border-base-300"
              >
                {session ? (
                  <>
                    <li className="px-4 py-3 border-b border-base-300">
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-10">
                            <span className="text-lg">
                              {session.user?.email?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">{session.user?.email?.split("@")[0]}</p>
                          <p className="text-xs text-base-content/60">{session.user?.email}</p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <Link
                        href="/upload"
                        className="px-4 py-3 hover:bg-base-200 flex items-center gap-3 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Video
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-3 text-error hover:bg-error/10 w-full text-left flex items-center gap-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-3 hover:bg-base-200 flex items-center gap-3 transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}