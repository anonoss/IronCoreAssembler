Name:       mipsx
Version:    2.0.0
Release:    1
Summary:    MIPS-X Assembler and Runtime
License:    MIT
BuildArch:  x86_64

%description
A modern toolchain for MIPS assembly, wrapping MARS.

%install
mkdir -p %{buildroot}/usr/local/bin
install -m 755 %{_sourcedir}/mipsx %{buildroot}/usr/local/bin/mipsx

%files
/usr/local/bin/mipsx
